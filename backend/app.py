from pathlib import Path
import pickle
import re
from typing import Dict, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# --------------------------------------------------
# FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="Customer Complaint Classification API",
    description="NLP-based customer complaint classification API",
    version="1.0.0"
)


# --------------------------------------------------
# CORS - Allow React frontend
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Load trained model package
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "best_complaint_model.pkl"
if not MODEL_PATH.exists():
    MODEL_PATH = BASE_DIR.parent / "best_complaint_model.pkl"

with open(MODEL_PATH, "rb") as file:
    model_package = pickle.load(file)


# Extract saved components
model = model_package["model"]
vectorizer = model_package["vectorizer"]
label_encoder = model_package["label_encoder"]
categories = model_package.get("categories", [])


def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+|https\S+", " ", text)
    text = re.sub(r"\S+@\S+", " ", text)
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# --------------------------------------------------
# Request & Response models
# --------------------------------------------------

class ComplaintRequest(BaseModel):
    complaint: Optional[str] = None
    text: Optional[str] = None


class PredictionResponse(BaseModel):
    category: str
    confidence: float
    probabilities: Dict[str, float]
    cleaned_text: str


# --------------------------------------------------
# Home & Health endpoints
# --------------------------------------------------

@app.get("/")
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Customer Complaint Classification API is running",
        "model_loaded": model is not None,
        "model_type": "Logistic Regression + TF-IDF"
    }


# --------------------------------------------------
# Prediction endpoint
# --------------------------------------------------

@app.post("/predict", response_model=PredictionResponse)
def predict_complaint(request: ComplaintRequest):
    raw_text = request.complaint if request.complaint is not None else request.text
    if not raw_text or not raw_text.strip():
        raise HTTPException(status_code=400, detail="Complaint text cannot be empty.")

    # Preprocess text
    cleaned = clean_text(raw_text)

    # Convert complaint text into TF-IDF features
    text_features = vectorizer.transform([cleaned])

    # Predict encoded class
    predicted_class = model.predict(text_features)[0]

    # Convert encoded class back to category name
    predicted_category = label_encoder.inverse_transform([predicted_class])[0]

    # Get probabilities
    probabilities = model.predict_proba(text_features)[0]

    # Map probabilities to category names
    probability_dict = {}
    for class_id, probability in zip(model.classes_, probabilities):
        category = label_encoder.inverse_transform([class_id])[0]
        probability_dict[category] = round(float(probability) * 100, 2)

    top_confidence = max(probability_dict.values())

    return PredictionResponse(
        category=predicted_category,
        confidence=top_confidence,
        probabilities=probability_dict,
        cleaned_text=cleaned
    )