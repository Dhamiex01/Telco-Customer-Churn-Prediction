# Telco Customer Churn Prediction

A machine learning web application that predicts whether a telecom customer is likely to churn, built with FastAPI and deployed on Render.

**Live demo:** [Add your Render URL here]
**Repository:** [Add your GitHub repo URL here]

## Overview

Customer churn is one of the biggest challenges for telecom companies. This project uses historical customer data (demographics, account information, and service subscriptions) to train a classification model that predicts churn risk, then serves that model through a FastAPI web app.

## Features

- Exploratory data analysis of the Telco Customer Churn dataset (distributions, churn rates by category, correlation and multicollinearity checks via VIF)
- Model comparison between Decision Tree and Random Forest classifiers, tuned with `GridSearchCV`
- Classification threshold optimized using Youden's J statistic to balance precision and recall
- Production pipeline (`ColumnTransformer` + `RandomForestClassifier`) serialized with `joblib` for deployment
- FastAPI endpoint(s) for real-time churn prediction on new customer data
- Deployed and publicly accessible on Render

## Model Performance

| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC |
|---|---|---|---|---|---|
| Decision Tree | — | — | — | — | — |
| Random Forest (threshold = 0.50) | 0.8006 | 0.6691 | 0.4920 | 0.5670 | 0.8430 |
| Random Forest (threshold = 0.2812, Youden's J) | 0.7516 | 0.5207 | 0.8075 | 0.6331 | — |

*Fill in the Decision Tree row and any blanks with your final notebook output.*

The final deployed model uses the Random Forest classifier with the Youden's J-optimized threshold, prioritizing recall so fewer at-risk customers are missed.

## Tech Stack

- **Language:** Python
- **Data & ML:** pandas, NumPy, scikit-learn, statsmodels
- **Visualization:** matplotlib, seaborn
- **Model serialization:** joblib
- **Web framework:** FastAPI
- **Deployment:** Render

## Project Structure

```
├── app/                    # FastAPI application
│   ├── main.py              # API entry point and routes
│   └── ...
├── model/
│   └── churn_model.joblib   # Trained preprocessing + classification pipeline
├── notebooks/
│   └── Telco_2.ipynb        # EDA, model training, and evaluation
├── requirements.txt
└── README.md
```

*Adjust this to match your actual repo layout.*

## Getting Started

### Prerequisites

- Python 3.9+
- pip

### Installation

```bash
git clone <your-repo-url>
cd <your-repo-name>
pip install -r requirements.txt
```

### Run locally

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`, with interactive docs at `http://127.0.0.1:8000/docs`.

## API Usage

Send a POST request with customer details to get a churn prediction:

```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "Female",
    "SeniorCitizen": "No",
    "Partner": "Yes",
    "Dependents": "No",
    "tenure": 12,
    "PhoneService": "Yes",
    "MultipleLines": "No",
    "InternetService": "Fiber optic",
    "OnlineSecurity": "No",
    "OnlineBackup": "No",
    "DeviceProtection": "No",
    "TechSupport": "No",
    "StreamingTV": "Yes",
    "StreamingMovies": "Yes",
    "Contract": "Month-to-month",
    "PaperlessBilling": "Yes",
    "PaymentMethod": "Electronic check",
    "MonthlyCharges": 70.35,
    "TotalCharges": 844.20
  }'
```

**Response:**

```json
{
  "churn_probability": 0.42,
  "prediction": "No Churn",
  "threshold": 0.2812
}
```

*Update the endpoint path, field names, and response shape to match your actual FastAPI implementation.*

## Dataset

This project uses the [Telco Customer Churn dataset](https://www.kaggle.com/datasets/blastchar/telco-customer-churn), containing customer demographics, account details, and subscribed services, with churn status as the target variable.

## Deployment

The application is deployed on [Render](https://render.com). To deploy your own instance:

1. Push this repository to GitHub
2. Create a new Web Service on Render and connect the repo
3. Set the build command: `pip install -r requirements.txt`
4. Set the start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Deploy

## Author

**Dhamiex'**
Final-year Electrical and Electronics Engineering student, Federal University of Agriculture, Abeokuta (FUNAAB)

## License

[Add your chosen license, e.g. MIT]
