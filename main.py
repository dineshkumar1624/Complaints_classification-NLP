import os
import re
import pickle
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict

app = FastAPI(
    title="Customer Complaint Classification NLP API",
    description="Backend API for classifying customer complaints using trained TF-IDF + Logistic Regression ML model.",
    version="1.0.0"
)

# Enable CORS for React frontend (development & production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "best_complaint_model.pkl"

# Global variables for model artifacts
model = None
vectorizer = None
label_encoder = None

def load_artifacts():
    global model, vectorizer, label_encoder
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file '{MODEL_PATH}' not found in root directory.")
    
    with open(MODEL_PATH, "rb") as f:
        data = pickle.load(f)
        
    model = data["model"]
    vectorizer = data["vectorizer"]
    label_encoder = data["label_encoder"]
    print("[INFO] ML model, vectorizer, and label encoder loaded successfully.")

# Load model artifacts on startup
@app.on_event("startup")
def startup_event():
    load_artifacts()

def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+|https\S+", " ", text)
    text = re.sub(r"\S+@\S+", " ", text)
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

class ComplaintRequest(BaseModel):
    complaint: str = Field(..., example="My credit card was charged twice for the same purchase.")

class PredictionResponse(BaseModel):
    category: str
    confidence: float
    probabilities: Dict[str, float]
    cleaned_text: str

@app.get("/")
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "model_type": "Logistic Regression + TF-IDF"
    }

@app.post("/predict", response_model=PredictionResponse)
def predict(request: ComplaintRequest):
    if not request.complaint or not request.complaint.strip():
        raise HTTPException(status_code=400, detail="Complaint text cannot be empty.")
    
    if model is None or vectorizer is None or label_encoder is None:
        raise HTTPException(status_code=500, detail="Model is not loaded.")
    
    try:
        # Preprocess input text
        cleaned = clean_text(request.complaint)
        
        # Transform using loaded TF-IDF vectorizer
        vector = vectorizer.transform([cleaned])
        
        # Predict class label
        prediction_idx = model.predict(vector)[0]
        predicted_category = label_encoder.inverse_transform([prediction_idx])[0]
        
        # Predict class probabilities
        probs = model.predict_proba(vector)[0]
        classes = label_encoder.classes_
        
        # Format probabilities as percentages rounded to 2 decimal places
        probability_dict = {}
        for cls_name, prob in zip(classes, probs):
            # Ensure proper key naming (e.g. mortgages_and_loans)
            key = str(cls_name).strip()
            probability_dict[key] = round(float(prob) * 100, 2)
            
        top_confidence = max(probability_dict.values())
        
        return PredictionResponse(
            category=predicted_category,
            confidence=top_confidence,
            probabilities=probability_dict,
            cleaned_text=cleaned
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
