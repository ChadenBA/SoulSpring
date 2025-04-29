import pandas as pd
import numpy as np
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> ecfe16737b05f2bbbe1c9274d49ae0634508d41c
import joblib
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
from imblearn.over_sampling import SMOTE
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder, StandardScaler

# 🔹 Step 1: Load dataset
df = pd.read_csv("disorder.csv")  

# 🔹 Step 2: Debug column names
print("📝 Columns in Disorder dataset:", df.columns)

# 🔹 Step 3: Ensure "Disorder" column exists
<<<<<<< HEAD
=======
=======
import joblib  # For saving/loading models
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
from imblearn.over_sampling import SMOTE

# 🔹 Step 1: Load dataset
df = pd.read_csv("disorder.csv")  # Update with the correct file path

# 🔹 Step 2: Debug column names
print("📝 Columns in Disorder:", df.columns)

# 🔹 Step 3: Ensure "target" column exists
>>>>>>> origin/sl_07
>>>>>>> ecfe16737b05f2bbbe1c9274d49ae0634508d41c
if "Disorder" not in df.columns:
    for col in df.columns:
        if "diagnosis" in col.lower() or "label" in col.lower():
            df.rename(columns={col: "Disorder"}, inplace=True)
            print(f"✅ Renamed column '{col}' to 'Disorder'")

if "Disorder" not in df.columns:
<<<<<<< HEAD
    raise KeyError("❌ 'Disorder' column not found! Please check your dataset.")
=======
<<<<<<< HEAD
    raise KeyError("❌ 'Disorder' column not found! Please check your dataset.")
=======
    raise KeyError("❌ 'target' column not found! Please check your dataset.")
>>>>>>> origin/sl_07
>>>>>>> ecfe16737b05f2bbbe1c9274d49ae0634508d41c

# 🔹 Step 4: Check class distribution
print("\n📊 Original class distribution:\n", df["Disorder"].value_counts())

# 🔹 Step 5: Handle missing values
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> ecfe16737b05f2bbbe1c9274d49ae0634508d41c
df = df.dropna()


# 🔹 Step 6: Drop the 'age' column
df = df.drop(columns=['age'], errors='ignore') 
# 🔹 Step 6: Encode target variable (if categorical)
le = LabelEncoder()
df["Disorder"] = le.fit_transform(df["Disorder"])

# 🔹 Step 7: Define Features (X) and Target (y)
X = df.drop(columns=["Disorder"])  
y = df["Disorder"]  

# 🔹 Step 8: Normalize numerical features
scaler = StandardScaler()
X = pd.DataFrame(scaler.fit_transform(X), columns=X.columns)

# 🔹 Step 9: Apply SMOTE to balance classes (consider reducing the over-sampling if necessary)
smote = SMOTE(sampling_strategy="auto", random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

print("\n📊 After SMOTE Class Distribution:\n", pd.Series(y_resampled).value_counts())

# 🔹 Step 10: Split data into Train/Test sets
<<<<<<< HEAD
=======
=======
df = df.dropna()  # Remove rows with missing values

# 🔹 Step 6: Define Features (X) and Target (y)
X = df.drop(columns=["Disorder"])  # Features
y = df["Disorder"]  # Target

# 🔹 Step 7: Apply SMOTE to balance classes
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

print("\n📊 After SMOTE:\n", pd.Series(y_resampled).value_counts())

# 🔹 Step 8: Split data into Train/Test sets
>>>>>>> origin/sl_07
>>>>>>> ecfe16737b05f2bbbe1c9274d49ae0634508d41c
X_train, X_test, y_train, y_test = train_test_split(
    X_resampled, y_resampled, test_size=0.2, stratify=y_resampled, random_state=42
)

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> ecfe16737b05f2bbbe1c9274d49ae0634508d41c
# 🔹 Step 11: Train the Model with Tuned Parameters
model = RandomForestClassifier(
    n_estimators=200, 
    max_depth=15, 
    min_samples_split=5, 
    min_samples_leaf=2, 
    class_weight="balanced",  
    random_state=42
)
model.fit(X_train, y_train)

# 🔹 Step 12: Save the model, label encoder, and scaler
joblib.dump(model, "disorder_model_rf.pkl")  # Save RandomForest model
joblib.dump(le, "disorder_label_encoder.pkl")  # Save Label Encoder
joblib.dump(scaler, "disorder_scaler.pkl")  # Save Scaler

# 🔹 Step 13: Make Predictions
y_pred = model.predict(X_test)

# 🔹 Step 14: Evaluate the Model
print("\n🔍 Classification Report:\n", classification_report(y_test, y_pred, target_names=le.classes_))
print("\n✅ Accuracy:", accuracy_score(y_test, y_pred))

# 🔹 Step 15: Perform Cross-Validation to Check for Overfitting
cv_scores = cross_val_score(model, X_resampled, y_resampled, cv=5, scoring="accuracy")
print(f"\nCross-validation scores: {cv_scores}")
print(f"Average cross-validation accuracy: {cv_scores.mean()}")

# 🔹 Step 16: Predict Function
# Step 16: Updated Predict Function
def predict_disorder(input_data):
    model = joblib.load("disorder_model_rf.pkl")
    le = joblib.load("disorder_label_encoder.pkl")
    scaler = joblib.load("disorder_scaler.pkl")
    
    # Drop the 'age' column if it exists in the input data
    

    # Ensure the input data is in the correct order as the training data
    input_df = pd.DataFrame([input_data], columns=X.columns)  
    input_df = scaler.transform(input_df)  # Normalize new data
    prediction = model.predict(input_df)
    return le.inverse_transform(prediction)[0]  # Convert back to original label


# 🔹 Step 17: Test Prediction
sample_input = X_test.iloc[7].to_dict()
print("\n🧠 Sample Prediction:", predict_disorder(sample_input))

# 🔹 Step 18: Feature Importance
importances = model.feature_importances_
feature_names = X.columns

sorted_idx = importances.argsort()
plt.figure(figsize=(10, 6))
plt.barh([feature_names[i] for i in sorted_idx], importances[sorted_idx])
plt.xlabel("Feature Importance")
plt.title("Feature Importance in Disorder Prediction")
plt.show()

# 🔹 Step 19: Threshold Adjustment (Optional, if you suspect bias towards a particular class)
probas = model.predict_proba(X_test)
threshold = 0.6  # Adjust as needed
predictions_adjusted = (probas[:, 1] > threshold).astype(int)  # For binary, adjust as needed
print(f"Adjusted predictions: {predictions_adjusted}")
<<<<<<< HEAD
=======
=======
# 🔹 Step 9: Train the Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 🔹 Step 10: Save the model
joblib.dump(model, "disorder_model.pkl")

# 🔹 Step 11: Make Predictions
y_pred = model.predict(X_test)

# 🔹 Step 12: Evaluate the Model
print("\n🔍 Classification Report:\n", classification_report(y_test, y_pred))
print("\n✅ Accuracy:", accuracy_score(y_test, y_pred))

# 🔹 Step 13: Predict Function
def predict_disorder(input_data):
    model = joblib.load("disorder_model.pkl")  # Load saved model
    input_df = pd.DataFrame([input_data], columns=X.columns)  # Convert to DataFrame
    prediction = model.predict(input_df)
    return prediction[0]

# 🔹 Step 14: Test Prediction
sample_input = X_test.iloc[0].to_dict()
print("\n🧠 Sample Prediction:", predict_disorder(sample_input))
>>>>>>> origin/sl_07
>>>>>>> ecfe16737b05f2bbbe1c9274d49ae0634508d41c
