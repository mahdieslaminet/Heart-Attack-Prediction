# api.py
import numpy as np
import pandas as pd
import joblib
from fastapi import FastAPI
from pydantic import BaseModel
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware
# ----------------------------
# Load artifacts
# ----------------------------
MODEL_PATH = "artifacts/mlp.keras"
PREPROCESSOR_PATH = "artifacts/preprocessor.joblib"

model = tf.keras.models.load_model(MODEL_PATH)
preprocessor = joblib.load(PREPROCESSOR_PATH)

app = FastAPI(
    title="Heart Attack Risk Prediction API",
    version="1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # React UI
        "http://localhost:5000"    # Gateway (optional)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------
# Input schema (Cleveland features)
# ----------------------------
class HeartInput(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

# ----------------------------
# Prediction endpoint
# ----------------------------
@app.post("/predict")
def predict(data: HeartInput):
    # Convert input to DataFrame (1 row)
    print(data)
    df = pd.DataFrame([data.dict()])
    print("Pre Processing")
    # Preprocess
    X = preprocessor.transform(df)
    print("Pre Processing Done")
    # Predict probability
    prob = float(model.predict(X)[0][0])
    print("Predicted")
    return {
        "heart_attack_risk_probability": round(prob, 4),
        "risk_label": "HIGH" if prob >= 0.5 else "LOW"
    }
