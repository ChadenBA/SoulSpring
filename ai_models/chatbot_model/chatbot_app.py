from flask import Flask, request, jsonify
import chatbot_model

app = Flask(__name__)

# Charger et prétraiter les données
df = chatbot_model.preprocess_data(r"C:\Users\Hala_Hamza\Desktop\SoulSpringBack\datasets_chatbot")

@app.route("/get_response", methods=["POST"])
def chatbot():
    data = request.get_json()
    user_input = data.get("message", "")

    if not user_input.strip():
        return jsonify({"response": "Veuillez poser une question."})

    response = chatbot_model.get_response(user_input, df)
    return jsonify({"response": response})

if __name__ == "__main__":
    print("Lancement du script chatbot_model.py")
    app.run(debug=True)

