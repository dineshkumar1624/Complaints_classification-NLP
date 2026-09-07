import pandas as pd
import numpy as np
import re
import pickle
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder

from sklearn.naive_bayes import ComplementNB
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay,
    f1_score
)


# ============================================================
# 1. LOAD DATASET
# ============================================================

FILE = "complaints_processed.csv"

df = pd.read_csv(FILE)

print("=" * 70)
print("CUSTOMER COMPLAINT CLASSIFICATION - NLP")
print("=" * 70)

print("\nOriginal dataset shape:")
print(df.shape)


# ============================================================
# 2. SELECT REQUIRED COLUMNS
# ============================================================

df = df[
    ["product", "narrative"]
].copy()


# ============================================================
# 3. REMOVE MISSING VALUES
# ============================================================

df = df.dropna(
    subset=["product", "narrative"]
)

print(
    "\nAfter removing missing values:",
    df.shape
)


# ============================================================
# 4. REMOVE EMPTY NARRATIVES
# ============================================================

df["narrative"] = (
    df["narrative"]
    .astype(str)
    .str.strip()
)

df = df[
    df["narrative"] != ""
].copy()


# ============================================================
# 5. REMOVE DUPLICATE COMPLAINTS
# ============================================================

before_duplicates = len(df)

df = df.drop_duplicates(
    subset=["narrative"]
)

after_duplicates = len(df)

print(
    "\nDuplicate narratives removed:",
    before_duplicates - after_duplicates
)

print(
    "Dataset after duplicate removal:",
    df.shape
)


# ============================================================
# 6. CATEGORY DISTRIBUTION
# ============================================================

print("\n" + "=" * 70)
print("CATEGORY DISTRIBUTION")
print("=" * 70)

print(
    df["product"].value_counts()
)


# ============================================================
# 7. TEXT PREPROCESSING
# ============================================================

def preprocess_text(text):

    text = str(text).lower()

    # Remove URLs
    text = re.sub(
        r"https?://\S+|www\.\S+",
        " ",
        text
    )

    # Remove email addresses
    text = re.sub(
        r"\S+@\S+",
        " ",
        text
    )

    # Remove special characters
    text = re.sub(
        r"[^a-z\s]",
        " ",
        text
    )

    # Remove extra spaces
    text = re.sub(
        r"\s+",
        " ",
        text
    ).strip()

    return text


df["clean_text"] = df[
    "narrative"
].apply(preprocess_text)


# ============================================================
# 8. DISPLAY PREPROCESSING EXAMPLES
# ============================================================

print("\n" + "=" * 70)
print("PREPROCESSING EXAMPLES")
print("=" * 70)

for i in range(min(5, len(df))):

    print("\nOriginal:")
    print(
        df.iloc[i]["narrative"][:300]
    )

    print("\nCleaned:")
    print(
        df.iloc[i]["clean_text"][:300]
    )


# ============================================================
# 9. REMOVE EMPTY CLEANED TEXT
# ============================================================

df = df[
    df["clean_text"].str.len() > 0
].copy()


# ============================================================
# 10. FEATURES AND LABEL
# ============================================================

X = df["clean_text"]

y = df["product"]


# ============================================================
# 11. LABEL ENCODING
# ============================================================

label_encoder = LabelEncoder()

y_encoded = label_encoder.fit_transform(y)

print("\n" + "=" * 70)
print("LABEL ENCODING")
print("=" * 70)

for number, label in enumerate(
    label_encoder.classes_
):

    print(
        number,
        "->",
        label
    )


# ============================================================
# 12. TRAIN TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y_encoded,

    test_size=0.20,

    random_state=42,

    stratify=y_encoded
)


print("\n" + "=" * 70)
print("TRAIN TEST SPLIT")
print("=" * 70)

print(
    "Training samples:",
    len(X_train)
)

print(
    "Testing samples:",
    len(X_test)
)


# ============================================================
# 13. TF-IDF FEATURE EXTRACTION
# ============================================================

print("\n" + "=" * 70)
print("TF-IDF FEATURE EXTRACTION")
print("=" * 70)


vectorizer = TfidfVectorizer(

    # Unigrams + bigrams
    ngram_range=(1, 2),

    # Ignore extremely rare words
    min_df=2,

    # Ignore words appearing in almost every document
    max_df=0.95,

    # Maximum vocabulary size
    max_features=50000,

    # Better handling of repeated terms
    sublinear_tf=True,

    # Normalize accented characters
    strip_accents="unicode"
)


X_train_tfidf = vectorizer.fit_transform(
    X_train
)

X_test_tfidf = vectorizer.transform(
    X_test
)


print(
    "TF-IDF training shape:",
    X_train_tfidf.shape
)

print(
    "TF-IDF testing shape:",
    X_test_tfidf.shape
)

print(
    "Vocabulary size:",
    len(vectorizer.vocabulary_)
)


# ============================================================
# 14. TRAINING MODELS
# ============================================================

models = {

    "Complement Naive Bayes":
        ComplementNB(
            alpha=0.1
        ),

    "Logistic Regression":
        LogisticRegression(
            max_iter=2000,
            class_weight="balanced",
            C=3.0
        ),

    "SVM":
        LinearSVC(
            C=1.5,
            class_weight="balanced"
        )
}


results = {}

predictions = {}


# ============================================================
# 15. MODEL TRAINING AND EVALUATION
# ============================================================

print("\n" + "=" * 70)
print("MODEL RESULTS")
print("=" * 70)


for name, model in models.items():

    print(
        f"\nTraining {name}..."
    )

    model.fit(
        X_train_tfidf,
        y_train
    )

    pred = model.predict(
        X_test_tfidf
    )

    predictions[name] = pred

    accuracy = accuracy_score(
        y_test,
        pred
    )

    macro_f1 = f1_score(
        y_test,
        pred,
        average="macro"
    )

    weighted_f1 = f1_score(
        y_test,
        pred,
        average="weighted"
    )

    results[name] = {
        "accuracy": accuracy,
        "macro_f1": macro_f1,
        "weighted_f1": weighted_f1
    }

    print("\n" + "-" * 60)

    print(name)

    print(
        f"Accuracy   : {accuracy * 100:.2f}%"
    )

    print(
        f"Macro F1   : {macro_f1 * 100:.2f}%"
    )

    print(
        f"Weighted F1: {weighted_f1 * 100:.2f}%"
    )

    print("\nClassification Report:")

    print(
        classification_report(
            y_test,
            pred,
            target_names=label_encoder.classes_,
            zero_division=0
        )
    )


# ============================================================
# 16. MODEL COMPARISON
# ============================================================

print("\n" + "=" * 70)
print("MODEL COMPARISON")
print("=" * 70)

for name, result in results.items():

    print(
        f"\n{name}"
    )

    print(
        f"Accuracy    : "
        f"{result['accuracy'] * 100:.2f}%"
    )

    print(
        f"Macro F1    : "
        f"{result['macro_f1'] * 100:.2f}%"
    )

    print(
        f"Weighted F1 : "
        f"{result['weighted_f1'] * 100:.2f}%"
    )


# ============================================================
# 17. SELECT BEST MODEL
# ============================================================
#
# We use MACRO F1 instead of accuracy because
# the dataset is highly imbalanced.
#
# ============================================================

best_model_name = max(
    results,
    key=lambda name: results[name]["macro_f1"]
)

best_model = models[
    best_model_name
]

best_prediction = predictions[
    best_model_name
]

best_accuracy = results[
    best_model_name
]["accuracy"]

best_macro_f1 = results[
    best_model_name
]["macro_f1"]


print("\n" + "=" * 70)
print("BEST MODEL")
print("=" * 70)

print(
    "Model:",
    best_model_name
)

print(
    f"Accuracy: {best_accuracy * 100:.2f}%"
)

print(
    f"Macro F1: {best_macro_f1 * 100:.2f}%"
)


# ============================================================
# 18. CONFUSION MATRIX
# ============================================================

cm = confusion_matrix(
    y_test,
    best_prediction
)

print("\n" + "=" * 70)
print("CONFUSION MATRIX")
print("=" * 70)

print(cm)


disp = ConfusionMatrixDisplay(

    confusion_matrix=cm,

    display_labels=
    label_encoder.classes_
)

fig, ax = plt.subplots(
    figsize=(10, 8)
)

disp.plot(
    ax=ax,
    xticks_rotation=45
)

plt.title(
    f"Confusion Matrix - {best_model_name}"
)

plt.tight_layout()

plt.savefig(
    "confusion_matrix.png",
    dpi=300
)

plt.show()


# ============================================================
# 19. MODEL COMPARISON GRAPH
# ============================================================

model_names = list(
    results.keys()
)

accuracies = [
    results[name]["accuracy"] * 100
    for name in model_names
]

macro_f1_scores = [
    results[name]["macro_f1"] * 100
    for name in model_names
]


x = np.arange(
    len(model_names)
)

width = 0.35


plt.figure(
    figsize=(10, 6)
)

plt.bar(
    x - width / 2,
    accuracies,
    width,
    label="Accuracy"
)

plt.bar(
    x + width / 2,
    macro_f1_scores,
    width,
    label="Macro F1"
)

plt.xticks(
    x,
    model_names,
    rotation=15
)

plt.ylabel(
    "Score (%)"
)

plt.title(
    "Model Performance Comparison"
)

plt.legend()

plt.ylim(
    0,
    100
)

plt.tight_layout()

plt.savefig(
    "model_comparison.png",
    dpi=300
)

plt.show()


# ============================================================
# 20. CATEGORY DISTRIBUTION GRAPH
# ============================================================

plt.figure(
    figsize=(10, 6)
)

df["product"].value_counts().plot(
    kind="bar"
)

plt.title(
    "Customer Complaint Category Distribution"
)

plt.xlabel(
    "Product Category"
)

plt.ylabel(
    "Number of Complaints"
)

plt.xticks(
    rotation=30
)

plt.tight_layout()

plt.savefig(
    "category_distribution.png",
    dpi=300
)

plt.show()


# ============================================================
# 21. PREDICTION FUNCTION
# ============================================================

def predict_category(text):

    cleaned = preprocess_text(
        text
    )

    features = vectorizer.transform(
        [cleaned]
    )

    prediction = best_model.predict(
        features
    )

    category = label_encoder.inverse_transform(
        prediction
    )[0]

    # Confidence for models that provide decision scores
    confidence = None

    if hasattr(
        best_model,
        "decision_function"
    ):

        scores = best_model.decision_function(
            features
        )

        scores = np.asarray(
            scores
        ).flatten()

        # Convert scores to approximate probabilities
        exp_scores = np.exp(
            scores - np.max(scores)
        )

        probabilities = (
            exp_scores /
            exp_scores.sum()
        )

        confidence = np.max(
            probabilities
        )

    elif hasattr(
        best_model,
        "predict_proba"
    ):

        probabilities = best_model.predict_proba(
            features
        )[0]

        confidence = np.max(
            probabilities
        )

    return category, confidence, cleaned


# ============================================================
# 22. TEST CUSTOM COMPLAINTS
# ============================================================

test_complaints = [

    (
        "I found several incorrect accounts on my credit "
        "report and I want them removed."
    ),

    (
        "A debt collector keeps calling me about a debt "
        "that I do not owe."
    ),

    (
        "My mortgage payment was incorrectly calculated "
        "and I need help with my home loan."
    ),

    (
        "I was charged an unexpected fee on my credit card."
    ),

    (
        "There is an unauthorized transaction in my bank "
        "account."
    ),

    (
        "The credit bureau has incorrect information "
        "about my payment history."
    ),

    (
        "A collection agency is threatening me about an "
        "old debt."
    ),

    (
        "My credit card company charged me twice for "
        "the same purchase."
    ),

    (
        "I cannot access my bank account and the transfer "
        "is still pending."
    )

]


print("\n" + "=" * 70)
print("CUSTOM COMPLAINT PREDICTIONS")
print("=" * 70)


for complaint in test_complaints:

    category, confidence, cleaned = (
        predict_category(
            complaint
        )
    )

    print("\nComplaint:")
    print(complaint)

    print(
        "Predicted category:",
        category.upper()
    )

    if confidence is not None:

        print(
            f"Confidence: "
            f"{confidence * 100:.2f}%"
        )

    print(
        "Cleaned text:",
        cleaned
    )


# ============================================================
# 23. SAVE MODEL PACKAGE
# ============================================================

model_package = {

    "model":
        best_model,

    "vectorizer":
        vectorizer,

    "label_encoder":
        label_encoder,

    "categories":
        list(
            label_encoder.classes_
        )
}


with open(
    "best_complaint_model.pkl",
    "wb"
) as file:

    pickle.dump(
        model_package,
        file
    )


# ============================================================
# 24. SAVE CLEAN DATASET
# ============================================================

df[
    [
        "product",
        "narrative",
        "clean_text"
    ]
].to_csv(
    "complaints_clean.csv",
    index=False
)


# ============================================================
# 25. FINAL OUTPUT
# ============================================================

print("\n" + "=" * 70)
print("FILES SAVED")
print("=" * 70)

print(
    "best_complaint_model.pkl"
)

print(
    "complaints_clean.csv"
)

print(
    "confusion_matrix.png"
)

print(
    "model_comparison.png"
)

print(
    "category_distribution.png"
)

print("\nNLP classification completed successfully!")