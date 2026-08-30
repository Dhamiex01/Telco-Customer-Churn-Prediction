from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from typing import Literal
import pandas as pd
import joblib
import os
import uvicorn


# ============================================================
# APPLICATION
# ============================================================

app = FastAPI(
    title="Customer Churn Prediction",
    description="Machine-learning based customer churn prediction application",
    version="1.0.0"
)


# ============================================================
# DIRECTORIES
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

FRONTEND_DIR = os.path.join(
    BASE_DIR,
    "frontend"
)


MODEL_PATH = os.path.join(
    BASE_DIR,
    "churn_model.joblib"
)

THRESHOLD_PATH = os.path.join(
    BASE_DIR,
    "churn_threshold.pkl"
)


# ============================================================
# STARTUP INFORMATION
# ============================================================

print()
print("=" * 55)
print("CUSTOMER CHURN APPLICATION")
print("=" * 55)

print()
print("Base directory:")
print(BASE_DIR)

print()
print("Frontend directory:")
print(FRONTEND_DIR)

print()
print("Checking frontend files...")

frontend_files = [
    "index.html",
    "result.html",
    "style.css",
    "script.js"
]

for filename in frontend_files:

    file_path = os.path.join(
        FRONTEND_DIR,
        filename
    )

    if os.path.exists(file_path):
        print(f"{filename}: FOUND")
    else:
        print(f"{filename}: MISSING")


# ============================================================
# LOAD MODEL
# ============================================================

try:

    model = joblib.load(
        MODEL_PATH
    )

    print()
    print("Churn model loaded successfully.")

except Exception as e:

    model = None

    print()
    print(
        f"ERROR loading churn model: {e}"
    )


# ============================================================
# LOAD THRESHOLD
# ============================================================

try:

    threshold = joblib.load(
        THRESHOLD_PATH
    )

    if isinstance(threshold, dict):

        if "threshold" in threshold:

            threshold = threshold["threshold"]

        elif "best_threshold" in threshold:

            threshold = threshold["best_threshold"]

    threshold = float(threshold)

    print(
        f"Churn threshold loaded: {threshold:.4f}"
    )

except Exception as e:

    threshold = 0.5

    print(
        "Could not load churn threshold."
    )

    print(
        f"Using default threshold: {threshold}"
    )

    print(
        f"Error: {e}"
    )


# ============================================================
# CUSTOMER DATA MODEL
# ============================================================

class CustomerData(BaseModel):

    gender: Literal["Male", "Female"]

    SeniorCitizen: Literal["Yes", "No"]

    Partner: Literal["Yes", "No"]

    Dependents: Literal["Yes", "No"]

    tenure: int = Field(
        ge=0,
        le=72
    )

    PhoneService: Literal["Yes", "No"]

    MultipleLines: Literal[
        "Yes",
        "No",
        "No phone service"
    ]

    InternetService: Literal[
        "DSL",
        "Fiber optic",
        "No"
    ]

    OnlineSecurity: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    OnlineBackup: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    DeviceProtection: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    TechSupport: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    StreamingTV: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    StreamingMovies: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    Contract: Literal[
        "Month-to-month",
        "One year",
        "Two year"
    ]

    PaperlessBilling: Literal[
        "Yes",
        "No"
    ]

    PaymentMethod: Literal[
        "Electronic check",
        "Mailed check",
        "Bank transfer (automatic)",
        "Credit card (automatic)"
    ]

    MonthlyCharges: float = Field(
        ge=0
    )

    TotalCharges: float = Field(
        ge=0
    )


# ============================================================
# STATIC FILES
# ============================================================

if os.path.isdir(FRONTEND_DIR):

    app.mount(
        "/frontend",
        StaticFiles(
            directory=FRONTEND_DIR
        ),
        name="frontend"
    )


# ============================================================
# HOME PAGE
# ============================================================

@app.get("/")
def home():

    return FileResponse(
        os.path.join(
            FRONTEND_DIR,
            "index.html"
        )
    )


# ============================================================
# RESULT PAGE
# ============================================================

@app.get("/result.html")
def result():

    return FileResponse(
        os.path.join(
            FRONTEND_DIR,
            "result.html"
        )
    )


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "threshold": threshold
    }


# ============================================================
# PREDICTION
# ============================================================

@app.post("/predict")
def predict(customer: CustomerData):

    # --------------------------------------------------------
    # Check model
    # --------------------------------------------------------

    if model is None:

        return {
            "success": False,
            "error": (
                "The machine-learning model "
                "could not be loaded."
            )
        }

    try:

        # ----------------------------------------------------
        # BUILD DATA
        # ----------------------------------------------------

        data = {

            "gender": customer.gender,

            "SeniorCitizen":
                customer.SeniorCitizen,

            "Partner":
                customer.Partner,

            "Dependents":
                customer.Dependents,

            "tenure":
                customer.tenure,

            "PhoneService":
                customer.PhoneService,

            "MultipleLines":
                customer.MultipleLines,

            "InternetService":
                customer.InternetService,

            "OnlineSecurity":
                customer.OnlineSecurity,

            "OnlineBackup":
                customer.OnlineBackup,

            "DeviceProtection":
                customer.DeviceProtection,

            "TechSupport":
                customer.TechSupport,

            "StreamingTV":
                customer.StreamingTV,

            "StreamingMovies":
                customer.StreamingMovies,

            "Contract":
                customer.Contract,

            "PaperlessBilling":
                customer.PaperlessBilling,

            "PaymentMethod":
                customer.PaymentMethod,

            "MonthlyCharges":
                customer.MonthlyCharges,

            "TotalCharges":
                customer.TotalCharges
        }


        # ----------------------------------------------------
        # DATAFRAME
        # ----------------------------------------------------

        X = pd.DataFrame(
            [data]
        )


        # ----------------------------------------------------
        # MODEL PREDICTION
        # ----------------------------------------------------

        probabilities = model.predict_proba(X)[0]


        # ----------------------------------------------------
        # FIND CHURN CLASS
        # ----------------------------------------------------

        try:

            classes = list(
                model.classes_
            )

            if 1 in classes:

                churn_index = classes.index(1)

            elif "Yes" in classes:

                churn_index = classes.index(
                    "Yes"
                )

            elif True in classes:

                churn_index = classes.index(
                    True
                )

            else:

                churn_index = 1

        except Exception:

            churn_index = 1


        # ----------------------------------------------------
        # CHURN PROBABILITY
        # ----------------------------------------------------

        churn_probability = float(
            probabilities[churn_index]
        )


        # ----------------------------------------------------
        # APPLY THRESHOLD
        # ----------------------------------------------------

        prediction = int(
            churn_probability >= threshold
        )

        # ----------------------------------------------------
        # RESULT
        # ----------------------------------------------------

        if prediction == 1:

            result_text = (
                "Higher Likelihood of Churn"
            )

            message = (
                "The model predicts that this "
                "customer has a higher likelihood "
                "of leaving the service."
            )

            risk_level = "High"

        else:

            result_text = (
                "Lower Likelihood of Churn"
            )

            message = (
                "The model predicts that this "
                "customer has a lower likelihood "
                "of leaving the service."
            )

            risk_level = "Low"


        # ----------------------------------------------------
        # RETURN RESPONSE
        # ----------------------------------------------------

        return {

            "success": True,

            "prediction": prediction,

            "churn": bool(
                prediction
            ),

            "result": result_text,

            "risk_level": risk_level,

            "message": message,

            "churn_probability": round(
                churn_probability * 100,
                2
            ),

            "confidence": round(
                confidence * 100,
                2
            ),

            "threshold": round(
                threshold * 100,
                2
            ),

            "customer": data
        }


    # --------------------------------------------------------
    # ERROR HANDLING
    # --------------------------------------------------------

    except Exception as e:

        print()
        print(
            "Prediction error:"
        )

        print(
            repr(e)
        )

        return {

            "success": False,

            "error": str(e)
        }


# ============================================================
# RUN APPLICATION
# ============================================================

if __name__ == "__main__":

    port = int(
        os.environ.get(
            "PORT",
            8000
        )
    )

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        reload=False
    )