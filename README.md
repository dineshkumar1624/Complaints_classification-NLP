# Customer Complaint Classification using NLP

An end-to-end Natural Language Processing (NLP) project that automatically classifies customer financial complaints into different product categories.

The project uses **TF-IDF feature extraction** with multiple machine learning algorithms and provides a modern **React frontend** connected to a **FastAPI backend** for real-time complaint classification.

---

## 🚀 Project Overview

Customer complaints can contain large amounts of unstructured text, making manual classification time-consuming.

This project automatically analyzes a customer's complaint and predicts which financial product category it belongs to.

### Supported Categories

- Credit Card
- Credit Reporting
- Debt Collection
- Mortgages & Loans
- Retail Banking

The trained model analyzes the complaint text and returns:

- Predicted category
- Prediction confidence
- Probability distribution across all categories

---

## 🏗️ Project Architecture

```text
Customer Complaint
        │
        ▼
 React Frontend
        │
        │ POST /predict
        ▼
 FastAPI Backend
        │
        ▼
 Trained ML Model
        │
        ▼
 TF-IDF Features
        │
        ▼
 Logistic Regression
        │
        ▼
 Prediction + Probabilities
        │
        ▼
 React Dashboard
🧠 NLP Pipeline

The project follows a complete NLP and machine learning pipeline.

Raw Complaint Text
        │
        ▼
Text Cleaning
        │
        ▼
Normalization
        │
        ▼
Duplicate Removal
        │
        ▼
Train-Test Split
        │
        ▼
TF-IDF Feature Extraction
        │
        ▼
Machine Learning Models
        │
        ├── Complement Naive Bayes
        ├── Logistic Regression
        └── Linear SVM
        │
        ▼
Model Evaluation
        │
        ▼
Best Model Selection
        │
        ▼
FastAPI Deployment
        │
        ▼
React Frontend
📊 Dataset

The project uses a customer financial complaint dataset containing complaint narratives and their corresponding product categories.

Original Dataset
Total records: 162,421
Features:
product
narrative

The dataset contains five product categories:

Category	Description
Credit Card	Complaints related to credit cards
Credit Reporting	Complaints related to credit reports and reporting errors
Debt Collection	Complaints involving debt collectors
Mortgages & Loans	Complaints involving mortgages and loans
Retail Banking	Complaints involving bank accounts and banking services
Data Cleaning

The preprocessing stage included:

Removing missing complaint narratives
Removing empty text
Removing duplicate complaint narratives
Cleaning and normalizing text

After removing duplicate narratives and invalid records, the working dataset contained approximately 124,472 unique complaint narratives.

Note: The original and cleaned CSV datasets are not included in this repository because of their large file sizes.

🔤 TF-IDF Feature Extraction

Text is converted into numerical features using TF-IDF (Term Frequency-Inverse Document Frequency).

The implementation uses:

Unigrams and bigrams
min_df = 2
max_df = 0.95
max_features = 50,000
sublinear_tf = True
Unicode accent stripping
Why TF-IDF?

TF-IDF gives higher importance to words that are useful for distinguishing between complaint categories while reducing the importance of very common words.

🤖 Machine Learning Models

Three machine learning algorithms were trained and compared.

1. Complement Naive Bayes

A Naive Bayes variant that performs well for text classification, especially when dealing with imbalanced datasets.

2. Logistic Regression

A linear classification algorithm that works very well with high-dimensional TF-IDF text features.

3. Linear Support Vector Machine

A linear SVM classifier designed for efficient classification of high-dimensional text data.

📈 Model Performance

The models were evaluated using:

Accuracy
Macro F1 Score
Weighted F1 Score
Model	Accuracy	Macro F1	Weighted F1
Complement Naive Bayes	82.40%	80.68%	82.38%
Logistic Regression	85.69%	84.61%	85.79%
Linear SVM	86.06%	84.48%	86.08%
🏆 Selected Model

Logistic Regression was selected as the deployed model because it achieved the highest Macro F1 Score (84.61%), providing strong performance across all complaint categories.

The trained model is stored as:

backend/best_complaint_model.pkl
📊 Evaluation Results

The repository contains visualizations generated during model evaluation.

Category Distribution

Confusion Matrix

Model Comparison

💻 Technology Stack
Machine Learning
Python
Pandas
NumPy
Scikit-learn
TF-IDF
Logistic Regression
Complement Naive Bayes
Linear SVM
Backend
FastAPI
Uvicorn
Python
Frontend
React
Vite
JavaScript
CSS
Development Tools
VS Code
Git
GitHub
📁 Project Structure
Complaints_classification-NLP/
│
├── backend/
│   └── best_complaint_model.pkl
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── category_distribution.png
├── category_summary.csv
├── confusion_matrix.png
├── model_comparison.png
│
├── main.py
├── nlp.py
├── .gitignore
└── README.md
⚙️ Installation
1. Clone the Repository
git clone https://github.com/dineshkumar1624/Complaints_classification-NLP.git
2. Navigate to the Project
cd Complaints_classification-NLP
🔧 Backend Setup

Navigate to the backend directory:

cd backend

Install the required Python packages:

pip install fastapi uvicorn scikit-learn pandas numpy

Start the FastAPI server:

python -m uvicorn app:app --reload

The backend will run at:

http://127.0.0.1:8001
🎨 Frontend Setup

Open another terminal and navigate to:

cd frontend

Install the dependencies:

npm install

Start the React development server:

npm run dev

The frontend will normally be available at:

http://localhost:5173
🧪 Example Predictions

The classifier can process complaints such as:

Example 1

Input:

There is an incorrect account on my credit report that does not belong to me.

Expected Category:

Credit Reporting
Example 2

Input:

A debt collector is contacting me about a debt that I do not owe.

Expected Category:

Debt Collection
Example 3

Input:

My credit card was charged twice for the same purchase.

Expected Category:

Credit Card
Example 4

Input:

My mortgage payment was calculated incorrectly.

Expected Category:

Mortgages & Loans
Example 5

Input:

Someone made an unauthorized transaction from my bank account.

Expected Category:

Retail Banking
🔌 API

The FastAPI backend exposes a prediction endpoint.

Endpoint
POST /predict
Request
{
  "text": "My credit card was charged twice for the same purchase."
}
Response
{
  "category": "credit_card",
  "confidence": 0.9988,
  "probabilities": {
    "credit_card": 0.9988,
    "credit_reporting": 0.0005,
    "debt_collection": 0.0002,
    "mortgages_and_loans": 0.0001,
    "retail_banking": 0.0004
  }
}
✨ Features
📝 Complaint text input
🤖 Automatic complaint classification
📊 Confidence score
📈 Probability distribution for all categories
📉 Model performance comparison
🧠 NLP pipeline explanation
⚡ FastAPI backend
🎨 Modern React frontend
📱 Responsive interface
🎯 Objectives

The main objectives of this project are:

Automatically classify financial customer complaints.
Apply NLP techniques to unstructured text.
Convert text into numerical features using TF-IDF.
Compare different machine learning algorithms.
Select the best-performing model.
Deploy the trained model through FastAPI.
Build an interactive React interface for real-time predictions.
🔮 Future Improvements

Possible future improvements include:

Using Transformer-based models such as BERT
Adding more complaint categories
Hyperparameter optimization
Model explainability
Adding authentication
Cloud deployment
Database integration
Continuous model retraining
Adding multilingual complaint classification
👨‍💻 Author

Dinesh Kumar Laveti

GitHub:

https://github.com/dineshkumar1624

📜 License

This project is created for educational and demonstration purposes.


### 3. Save the file

Press:

```text
Ctrl + S