import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor  # Change to regressor

# Load dataset
df_stress = pd.read_csv('stress.csv')

# Check and handle missing values in 'stress_level'
print(f"NaN values in stress_level before filling: {df_stress['stress_level'].isna().sum()}")  # Check for NaN values in the target column

# Handle missing or invalid values in 'stress_level' (filling with the mode)
df_stress['stress_level'] = df_stress['stress_level'].fillna(df_stress['stress_level'].mode()[0])

# Ensure no NaN values in target variable
print(f"NaN values in stress_level after filling: {df_stress['stress_level'].isna().sum()}")  # Check if NaN values are filled

# Features (q1 to q8) and Target (stress_level)
question_cols = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8']
X_stress = df_stress[question_cols].values
y_stress = df_stress['stress_level'].values  # Target column (direct stress percentage)

# Train-test split
X_train_stress, X_test_stress, y_train_stress, y_test_stress = train_test_split(X_stress, y_stress, test_size=0.2, random_state=42)

# Feature Scaling
scaler_stress = StandardScaler()
X_train_scaled_stress = scaler_stress.fit_transform(X_train_stress)
X_test_scaled_stress = scaler_stress.transform(X_test_stress)

# Train Model (using RandomForestRegressor)
stress_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)  # Change to regressor
stress_model_rf.fit(X_train_scaled_stress, y_train_stress)

# Save Model & Scaler
joblib.dump(stress_model_rf, 'stress_model_rf_regressor.pkl')  # Updated model name
joblib.dump(scaler_stress, 'stress_scaler.pkl')

print("Model trained and saved successfully!")

