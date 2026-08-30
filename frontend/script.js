/* ============================================================
   CUSTOMER CHURN AI
   COMPLETE JAVASCRIPT
   ============================================================ */

(function () {

    "use strict";


    /* ========================================================
       FIELD RULES
       ======================================================== */

    const fieldRules = {

        gender: {
            required: true,
            message: "Gender is required."
        },

        SeniorCitizen: {
            required: true,
            message: "Senior Citizen selection is required."
        },

        Partner: {
            required: true,
            message: "Partner selection is required."
        },

        Dependents: {
            required: true,
            message: "Dependents selection is required."
        },

        tenure: {
            required: true,
            min: 0,
            max: 72,
            integer: true,
            message: "Tenure must be between 0 and 72 months."
        },

        PhoneService: {
            required: true,
            message: "Phone Service selection is required."
        },

        MultipleLines: {
            required: true,
            message: "Multiple Lines selection is required."
        },

        InternetService: {
            required: true,
            message: "Internet Service selection is required."
        },

        OnlineSecurity: {
            required: true,
            message: "Online Security selection is required."
        },

        OnlineBackup: {
            required: true,
            message: "Online Backup selection is required."
        },

        DeviceProtection: {
            required: true,
            message: "Device Protection selection is required."
        },

        TechSupport: {
            required: true,
            message: "Tech Support selection is required."
        },

        StreamingTV: {
            required: true,
            message: "Streaming TV selection is required."
        },

        StreamingMovies: {
            required: true,
            message: "Streaming Movies selection is required."
        },

        Contract: {
            required: true,
            message: "Contract selection is required."
        },

        PaperlessBilling: {
            required: true,
            message: "Paperless Billing selection is required."
        },

        PaymentMethod: {
            required: true,
            message: "Payment Method selection is required."
        },

        MonthlyCharges: {
            required: true,
            min: 0,
            message: "Monthly Charges must be 0 or greater."
        },

        TotalCharges: {
            required: true,
            min: 0,
            message: "Total Charges must be 0 or greater."
        }

    };


    /* ========================================================
       GET ERROR ELEMENT
       ======================================================== */

    function getErrorElement(field) {

        return document.getElementById(
            field.id + "-error"
        );

    }


    /* ========================================================
       SHOW ERROR
       ======================================================== */

    function showError(field, message) {

        if (!field) {
            return;
        }


        field.classList.remove(
            "input-valid"
        );


        field.classList.add(
            "input-invalid"
        );


        const errorElement =
            getErrorElement(field);


        if (errorElement) {

            errorElement.textContent =
                message;

            errorElement.classList.add(
                "show"
            );
        }

    }


    /* ========================================================
       CLEAR ERROR
       ======================================================== */

    function clearError(field) {

        if (!field) {
            return;
        }


        field.classList.remove(
            "input-invalid"
        );


        const errorElement =
            getErrorElement(field);


        if (errorElement) {

            errorElement.textContent =
                "";

            errorElement.classList.remove(
                "show"
            );
        }

    }


    /* ========================================================
       SHOW VALID
       ======================================================== */

    function showValid(field) {

        if (!field) {
            return;
        }


        field.classList.remove(
            "input-invalid"
        );


        field.classList.add(
            "input-valid"
        );


        const errorElement =
            getErrorElement(field);


        if (errorElement) {

            errorElement.textContent =
                "";

            errorElement.classList.remove(
                "show"
            );
        }

    }


    /* ========================================================
       VALIDATE FIELD
       ======================================================== */

    function validateField(field) {

        if (!field) {

            return true;
        }


        const name =
            field.name ||
            field.id;


        const rule =
            fieldRules[name];


        if (!rule) {

            return true;
        }


        const rawValue =
            field.value.trim();


        /* ----------------------------------------------------
           REQUIRED
           ---------------------------------------------------- */

        if (
            rule.required &&
            rawValue === ""
        ) {

            showError(
                field,
                rule.message
            );

            return false;
        }


        /* ----------------------------------------------------
           NUMBER VALIDATION
           ---------------------------------------------------- */

        if (
            field.type === "number" &&
            rawValue !== ""
        ) {

            const numberValue =
                Number(rawValue);


            if (
                !Number.isFinite(
                    numberValue
                )
            ) {

                showError(
                    field,
                    "Please enter a valid number."
                );

                return false;
            }


            /* MINIMUM */

            if (
                rule.min !== undefined &&
                numberValue < rule.min
            ) {

                showError(
                    field,
                    rule.message
                );

                return false;
            }


            /* MAXIMUM */

            if (
                rule.max !== undefined &&
                numberValue > rule.max
            ) {

                showError(
                    field,
                    rule.message
                );

                return false;
            }


            /* INTEGER */

            if (
                rule.integer &&
                !Number.isInteger(
                    numberValue
                )
            ) {

                showError(
                    field,
                    "Please enter a whole number."
                );

                return false;
            }

        }


        /* ----------------------------------------------------
           HTML MINIMUM / MAXIMUM
           ---------------------------------------------------- */

        if (
            field.type === "number" &&
            rawValue !== ""
        ) {

            const numberValue =
                Number(rawValue);


            if (
                field.min !== "" &&
                numberValue <
                Number(field.min)
            ) {

                showError(
                    field,
                    rule.message
                );

                return false;
            }


            if (
                field.max !== "" &&
                numberValue >
                Number(field.max)
            ) {

                showError(
                    field,
                    rule.message
                );

                return false;
            }

        }


        /* ----------------------------------------------------
           VALID
           ---------------------------------------------------- */

        showValid(field);

        return true;

    }


    /* ========================================================
       VALIDATE ENTIRE FORM
       ======================================================== */

    function validateForm(form) {

        let valid = true;


        Object.keys(
            fieldRules
        ).forEach(function (fieldName) {

            const field =
                form.elements[fieldName];


            if (!field) {
                return;
            }


            const fieldValid =
                validateField(field);


            if (!fieldValid) {

                valid = false;
            }

        });


        return valid;

    }


    /* ========================================================
       BUILD CUSTOMER DATA
       ======================================================== */

    function buildCustomerData(form) {

        const data = {};


        Object.keys(
            fieldRules
        ).forEach(function (fieldName) {

            const field =
                form.elements[fieldName];


            if (!field) {
                return;
            }


            if (
                field.type === "number"
            ) {

                data[fieldName] =
                    Number(field.value);

            } else {

                data[fieldName] =
                    field.value;

            }

        });


        return data;

    }


    /* ========================================================
       FORM PAGE
       ======================================================== */

    const form =
        document.getElementById(
            "churnForm"
        );


    if (form) {

        /* ----------------------------------------------------
           LIVE VALIDATION
           ---------------------------------------------------- */

        Object.keys(
            fieldRules
        ).forEach(function (fieldName) {

            const field =
                form.elements[fieldName];


            if (!field) {
                return;
            }


            /*
             * Select fields:
             * validate immediately after selection.
             */

            if (
                field.tagName ===
                "SELECT"
            ) {

                field.addEventListener(
                    "change",
                    function () {

                        validateField(
                            field
                        );

                    }
                );

            }


            /*
             * Number/text fields:
             * validate as the user types.
             */

            else {

                field.addEventListener(
                    "input",
                    function () {

                        validateField(
                            field
                        );

                    }
                );


                field.addEventListener(
                    "blur",
                    function () {

                        validateField(
                            field
                        );

                    }
                );

            }

        });


        /* ----------------------------------------------------
           FORM SUBMISSION
           ---------------------------------------------------- */

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* Validate everything */

                const valid =
                    validateForm(form);


                if (!valid) {

                    /*
                     * Find first invalid field.
                     */

                    const firstInvalid =
                        form.querySelector(
                            ".input-invalid"
                        );


                    if (firstInvalid) {

                        firstInvalid.focus();

                        firstInvalid.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }


                    return;
                }


                /* ------------------------------------------------
                   BUILD DATA
                   ------------------------------------------------ */

                const customer =
                    buildCustomerData(form);


                /* ------------------------------------------------
                   BUTTON
                   ------------------------------------------------ */

                const button =
                    document.getElementById(
                        "predictButton"
                    );


                if (button) {

                    button.disabled =
                        true;

                    button.textContent =
                        "Generating Prediction...";

                    button.classList.add(
                        "button-loading"
                    );

                }


                try {

                    /* --------------------------------------------
                       SEND TO FASTAPI
                       -------------------------------------------- */

                    const response =
                        await fetch(
                            "/predict",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        customer
                                    )
                            }
                        );


                    /* --------------------------------------------
                       READ RESPONSE
                       -------------------------------------------- */

                    const result =
                        await response.json();


                    /* --------------------------------------------
                       API ERROR
                       -------------------------------------------- */

                    if (
                        !response.ok ||
                        !result.success
                    ) {

                        throw new Error(
                            result.error ||
                            "Prediction could not be generated."
                        );

                    }


                    /* --------------------------------------------
                       SAVE RESULT
                       -------------------------------------------- */

                    sessionStorage.setItem(
                        "churnPredictionResult",
                        JSON.stringify(
                            result
                        )
                    );


                    /* --------------------------------------------
                       GO TO RESULT PAGE
                       -------------------------------------------- */

                    window.location.href =
                        "/result.html";


                } catch (error) {

                    console.error(
                        "Prediction error:",
                        error
                    );


                    alert(
                        error.message ||
                        "An error occurred while generating the prediction."
                    );


                    if (button) {

                        button.disabled =
                            false;

                        button.textContent =
                            "Predict Customer Churn";

                        button.classList.remove(
                            "button-loading"
                        );

                    }

                }

            }
        );

    }


    /* ========================================================
       RESULT PAGE
       ======================================================== */

    const predictionResult =
        document.getElementById(
            "predictionResult"
        );


    if (predictionResult) {

        loadResultPage();

    }


    /* ========================================================
       LOAD RESULT PAGE
       ======================================================== */

    function loadResultPage() {

        const stored =
            sessionStorage.getItem(
                "churnPredictionResult"
            );


        /* ----------------------------------------------------
           NO RESULT
           ---------------------------------------------------- */

        if (!stored) {

            predictionResult.innerHTML = `

                <div class="api-error">

                    <strong>
                        No prediction found.
                    </strong>

                    <p>
                        Please return to the prediction
                        form and submit a customer.
                    </p>

                </div>

            `;

            return;

        }


        /* ----------------------------------------------------
           PARSE RESULT
           ---------------------------------------------------- */

        let result;


        try {

            result =
                JSON.parse(
                    stored
                );

        } catch (error) {

            predictionResult.innerHTML = `

                <div class="api-error">

                    Unable to read the prediction result.

                </div>

            `;

            return;

        }


        /* ----------------------------------------------------
           RESULT VALUES
           ---------------------------------------------------- */

        const isHigh =
            result.prediction === 1;


        const iconClass =
            isHigh
                ? "high"
                : "low";


        const icon =
            isHigh
                ? "!"
                : "✓";


        const resultTitle =
            result.result ||
            (
                isHigh
                    ? "Higher Likelihood of Churn"
                    : "Lower Likelihood of Churn"
            );


        const message =
            result.message ||
            "";


        const probability =
            Number(
                result.churn_probability
            ) || 0;


        const confidence =
            Number(
                result.confidence
            ) || 0;


        const riskLevel =
            result.risk_level ||
            (
                isHigh
                    ? "High"
                    : "Low"
            );


        /* ----------------------------------------------------
           RESULT HTML
           ---------------------------------------------------- */

        predictionResult.innerHTML = `

            <div
                class="result-icon ${iconClass}"
                aria-hidden="true"
            >
                ${icon}
            </div>


            <h1>
                ${escapeHtml(resultTitle)}
            </h1>


            <p class="prediction-message">
                ${escapeHtml(message)}
            </p>


            <div class="confidence-box">

                <span class="confidence-label">
                    Model confidence
                </span>

                <span class="confidence-value">
                    ${formatPercentage(confidence)}
                </span>

            </div>


            <div class="probability-box">

                <div class="probability-top">

                    <span class="probability-label">
                        Churn probability
                    </span>

                    <span class="probability-value">
                        ${formatPercentage(probability)}
                    </span>

                </div>


                <div class="progress-track">

                    <div
                        class="progress-bar"
                        style="width: ${clamp(
                            probability,
                            0,
                            100
                        )}%"
                    ></div>

                </div>

            </div>


            <div class="risk-box">

                <span class="risk-label">
                    Risk level
                </span>

                <span class="risk-value">
                    ${escapeHtml(riskLevel)}
                </span>

            </div>

        `;


        /* ----------------------------------------------------
           CUSTOMER INFORMATION
           ---------------------------------------------------- */

        const customerContainer =
            document.getElementById(
                "customerInformation"
            );


        if (
            customerContainer &&
            result.customer
        ) {

            renderCustomerInformation(
                customerContainer,
                result.customer
            );

        }


        /* ----------------------------------------------------
           NEW PREDICTION
           ---------------------------------------------------- */

        const newPrediction =
            document.getElementById(
                "newPrediction"
            );


        if (newPrediction) {

            newPrediction.addEventListener(
                "click",
                function () {

                    sessionStorage.removeItem(
                        "churnPredictionResult"
                    );

                    window.location.href =
                        "/";

                }
            );

        }

    }


    /* ========================================================
       CUSTOMER INFORMATION
       ======================================================== */

    function renderCustomerInformation(
        container,
        customer
    ) {

        const labels = {

            gender:
                "Gender",

            SeniorCitizen:
                "Senior Citizen",

            Partner:
                "Partner",

            Dependents:
                "Dependents",

            tenure:
                "Tenure",

            PhoneService:
                "Phone Service",

            MultipleLines:
                "Multiple Lines",

            InternetService:
                "Internet Service",

            OnlineSecurity:
                "Online Security",

            OnlineBackup:
                "Online Backup",

            DeviceProtection:
                "Device Protection",

            TechSupport:
                "Tech Support",

            StreamingTV:
                "Streaming TV",

            StreamingMovies:
                "Streaming Movies",

            Contract:
                "Contract",

            PaperlessBilling:
                "Paperless Billing",

            PaymentMethod:
                "Payment Method",

            MonthlyCharges:
                "Monthly Charges",

            TotalCharges:
                "Total Charges"

        };


        const order = [

            "gender",

            "SeniorCitizen",

            "Partner",

            "Dependents",

            "tenure",

            "PhoneService",

            "MultipleLines",

            "InternetService",

            "OnlineSecurity",

            "OnlineBackup",

            "DeviceProtection",

            "TechSupport",

            "StreamingTV",

            "StreamingMovies",

            "Contract",

            "PaperlessBilling",

            "PaymentMethod",

            "MonthlyCharges",

            "TotalCharges"

        ];


        let html = "";


        order.forEach(
            function (fieldName) {

                if (
                    customer[fieldName] ===
                    undefined
                ) {

                    return;

                }


                let value =
                    customer[fieldName];


                if (
                    fieldName ===
                    "MonthlyCharges"
                ) {

                    value =
                        formatNumber(
                            value
                        );

                }


                if (
                    fieldName ===
                    "TotalCharges"
                ) {

                    value =
                        formatNumber(
                            value
                        );

                }


                if (
                    fieldName ===
                    "tenure"
                ) {

                    value =
                        `${value} months`;

                }


                html += `

                    <div class="customer-field">

                        <span class="customer-field-label">
                            ${escapeHtml(
                                labels[fieldName]
                            )}
                        </span>

                        <span class="customer-field-value">
                            ${escapeHtml(
                                String(value)
                            )}
                        </span>

                    </div>

                `;

            }
        );


        container.innerHTML =
            html;

    }


    /* ========================================================
       FORMAT NUMBER
       ======================================================== */

    function formatNumber(value) {

        const number =
            Number(value);


        if (
            !Number.isFinite(
                number
            )
        ) {

            return "0.00";

        }


        return number.toFixed(2);

    }


    /* ========================================================
       FORMAT PERCENTAGE
       ======================================================== */

    function formatPercentage(value) {

        const number =
            Number(value);


        if (
            !Number.isFinite(
                number
            )
        ) {

            return "0.00%";

        }


        return (
            clamp(
                number,
                0,
                100
            ).toFixed(2)
            + "%"
        );

    }


    /* ========================================================
       CLAMP
       ======================================================== */

    function clamp(
        value,
        minimum,
        maximum
    ) {

        return Math.min(
            Math.max(
                Number(value) || 0,
                minimum
            ),
            maximum
        );

    }


    /* ========================================================
       ESCAPE HTML
       ======================================================== */

    function escapeHtml(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


})();