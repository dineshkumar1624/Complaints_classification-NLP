from pathlib import Path
import pickle

from fastapi import FastAPI
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
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Load trained model package
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "best_complaint_model.pkl"

with open(MODEL_PATH, "rb") as file:
    model_package = pickle.load(file)


# Extract saved components
model = model_package["model"]
vectorizer = model_package["vectorizer"]
label_encoder = model_package["label_encoder"]
categories = model_package["categories"]


# --------------------------------------------------
# Request model
# --------------------------------------------------

class ComplaintRequest(BaseModel):
    text: str


# --------------------------------------------------
# Home endpoint
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Customer Complaint Classification API is running"
    }


# --------------------------------------------------
# Prediction endpoint
# --------------------------------------------------

@app.post("/predict")
def predict_complaint(request: ComplaintRequest):

    text = request.text.strip()

    # Check empty input
    if not text:
        return {
            "error": "Complaint text cannot be empty"
        }

    # Convert complaint text into TF-IDF features
    text_features = vectorizer.transform([text])

    # Predict encoded class
    predicted_class = model.predict(text_features)[0]

    # Convert encoded class back to category name
    predicted_category = label_encoder.inverse_transform(
        [predicted_class]
    )[0]

    # Get probabilities
    probabilities = model.predict_proba(text_features)[0]

    # Map probabilities to category names
    probability_dict = {}

    for class_id, probability in zip(model.classes_, probabilities):

        category = label_encoder.inverse_transform(
            [class_id]
        )[0]

        probability_dict[category] = round(
            float(probability) * 100,
            2
        )

    # Confidence of predicted category
    confidence = round(
        float(max(probabilities)) * 100,
        2
    )

    return {
        "category": predicted_category,
        "confidence": confidence,
        "probabilities": probability_dict
    }