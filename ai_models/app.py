from flask import Flask, request, jsonify
import requests
import joblib
import numpy as np
import logging
import pandas as pd

# Set up basic logging
logging.basicConfig(level=logging.DEBUG)
# Initialize Flask app
app = Flask(__name__)


def load_model_and_scaler(model_file, scaler_file):
    try:
        model = joblib.load(model_file)
        scaler = joblib.load(scaler_file)
        return model, scaler
    except Exception as e:
        raise Exception(f"Error loading model or scaler: {e}")
# Load pre-trained models and scalers
try:
   
    label_encoder = joblib.load('disorder_label_encoder.pkl')
    stress_model_rf = joblib.load('stress_model_rf.pkl')
    stress_scaler = joblib.load('stress_scaler.pkl')



except Exception as e:
    print(f"Error loading models or scalers: {e}")
    stress_model = disorder_model = stress_scaler = disorder_scaler = None

# URL for communication with Node.js API
NODE_API_URL = "http://localhost:8000/ProcAnswers"
PREDICT_API_URL = "http://localhost:8000/user/test/submit-responses"



# Load the pre-trained model and scaler
stress_model_rf = joblib.load('stress_model_rf_regressor.pkl')
stress_scaler = joblib.load('stress_scaler.pkl')

# Define function to categorize stress level based on percentage
def categorize_stress_level(percentage):
    # Ensure that percentage is a number (float or int)
    try:
        percentage = float(percentage)
    except ValueError:
        raise ValueError(f"Invalid percentage value: {percentage}. It should be numeric.")
    
    if percentage <= 30:
        return 'Low'
    elif 30 < percentage <= 60:
        return 'Medium'
    elif 60 < percentage <= 90:
        return 'High'
    else:
        return 'Very High'

@app.route('/predict_stress', methods=['POST'])
def predict_stress():
    data = request.get_json()

    if 'userId' not in data:
        return jsonify({'error': 'Missing userId parameter'}), 400

    user_id = data['userId']

    # Fetch features from Node.js
    try:
        proc_answers = requests.get(f"{NODE_API_URL}/{user_id}")
        proc_answers.raise_for_status()
        proc_answers_data = proc_answers.json()

        if 'procAnwers' not in proc_answers_data or 'stressAnswers' not in proc_answers_data['procAnwers']:
            return jsonify({'error': 'No stress answers found for this user.'}), 404

        stress_answers = proc_answers_data['procAnwers']['stressAnswers']

        if len(stress_answers) != 8:
            return jsonify({'error': 'Invalid number of stress answers. Expected 8.'}), 400

        # No need to map values, since stress_answers are already numerical
        stress_answers = np.array(stress_answers).reshape(1, -1)

        # Apply the scaler (make sure the scaler is already fitted)
        stress_answers_scaled = stress_scaler.transform(stress_answers)

    except requests.exceptions.RequestException as e:
        return jsonify({'error': f"Error fetching answers from Node.js: {e}"}), 500

    # Predict Stress Level Percentage
    try:
        # Get the predicted stress level percentage
        predicted_percentage = stress_model_rf.predict(stress_answers_scaled)[0]

        # Ensure the predicted percentage is a float for comparisons
        predicted_percentage = float(predicted_percentage)

        # Categorize the stress level based on percentage
        stress_category = categorize_stress_level(predicted_percentage)

        result_data = {
            "userId": user_id, 
            "stressPercentage": round(predicted_percentage, 2),
            "stressCategory": stress_category
        }
        print("Sending data to Node.js:", result_data)

        # Send result to Node.js API
        try:
            response = requests.post(PREDICT_API_URL, json=result_data)
            
            if response.status_code != 200:
                print(f"Error posting to Node.js: {response.text}")
        except requests.exceptions.RequestException as e:
            print(f"Error communicating with Node.js: {e}")

        return jsonify(result_data)

    except Exception as e:
        return jsonify({'error': f"Error predicting stress: {e}"}), 500





@app.route('/predict_disorder', methods=['POST'])
def predict_disorder():
    data = request.get_json()

    if 'userId' not in data:
        logging.error("Missing userId parameter")
        return jsonify({'error': 'Missing userId parameter'}), 400

    user_id = data['userId']

    try:
        proc_answers = requests.get(f"http://localhost:8000/ProcAnswers/{user_id}")
        proc_answers.raise_for_status()
        proc_answers_data = proc_answers.json()

        if 'procAnwers' not in proc_answers_data or 'disorderAnswers' not in proc_answers_data['procAnwers']:
            logging.error("No disorder answers found for this user.")
            return jsonify({'error': 'No disorder answers found for this user.'}), 404

        disorder_answers = proc_answers_data['procAnwers']['disorderAnswers']
        logging.debug(f"Disorder answers received: {disorder_answers}")

        # Reshape the input into a 2D array (1 row, 27 columns)
        disorder_answers = np.array(disorder_answers).reshape(1, -1)

    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching answers: {e}")
        return jsonify({'error': f"Error fetching answers: {e}"}), 500
    except Exception as e:
        logging.error(f"Error processing data: {e}")
        return jsonify({'error': f"Error processing data: {e}"}), 500

    # Ensure models are loaded before prediction
    try:
        disorder_model, disorder_scaler = load_model_and_scaler('disorder_model_rf.pkl', 'disorder_scaler.pkl')
        if disorder_model is None or disorder_scaler is None:
            logging.error('Error loading disorder model or scaler.')
            return jsonify({'error': 'Error loading disorder model or scaler.'}), 500
        
        # Create a DataFrame with the correct column names
        column_names =[
       'feeling.nervous', 'panic', 'breathing.rapidly',
       'sweating', 'trouble.in.concentration', 'having.trouble.in.sleeping',
       'having.trouble.with.work', 'hopelessness', 'anger', 'over.react',
       'change.in.eating', 'suicidal.thought', 'feeling.tired', 'close.friend',
       'social.media.addiction', 'weight.gain', 'introvert',
       'popping.up.stressful.memory', 'having.nightmares',
       'avoids.people.or.activities', 'feeling.negative',
       'trouble.concentrating', 'blamming.yourself', 'hallucinations',
       'repetitive.behaviour', 'seasonally', 'increased.energy'
]
        disorder_answers_df = pd.DataFrame(disorder_answers, columns=column_names)

        # Apply scaler (ensure it expects the same structure)
        disorder_answers_scaled = disorder_scaler.transform(disorder_answers_df)
        logging.debug(f"Scaled disorder answers: {disorder_answers_scaled}")
        
        # Make the prediction using the disorder model
        disorder_prediction_encoded = disorder_model.predict(disorder_answers_scaled)[0]
        
        # Decode the prediction if label encoding is used
        disorder_prediction = label_encoder.inverse_transform([disorder_prediction_encoded])[0]
        severity = calculate_severity(disorder_answers[0])
        
        result_data = {
            "userId": user_id,
            "disorderPrediction": disorder_prediction,
            "severity": severity
        }
        return jsonify(result_data)

    except Exception as e:
        logging.error(f"Error predicting disorder: {e}")
        return jsonify({'error': f"Error predicting disorder: {e}"}), 500




def calculate_severity(answers):
    """
    This function calculates the severity based on the number of `1`s in the answers.
    - 0-5 `1`s: Mild
    - 6-15 `1`s: Moderate
    - 16-27 `1`s: Severe
    """
    count_ones = np.sum(answers == 1)
    
    if count_ones <= 5:
        return "Mild"
    elif 6 <= count_ones <= 15:
        return "Moderate"
    else:
        return "Severe"



if __name__ == '__main__':
    app.run(debug=True)