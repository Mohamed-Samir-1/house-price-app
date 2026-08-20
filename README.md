# House Price Prediction — End-to-End ML Web App

## Overview

This project is an end-to-end machine learning application for predicting house prices from property details.

The project contains:

- A Jupyter Notebook for data loading, cleaning, EDA, feature engineering, model training, evaluation, and export.
- A FastAPI backend that loads the trained model and serves predictions.
- A React + TypeScript + Vite frontend where users enter property details and receive a predicted price.
- Automated backend tests.
- GitHub-ready project structure.

## Dataset

**House Price by Juhi Bhojani**

Kaggle:
https://www.kaggle.com/datasets/juhibhojani/house-price

The raw CSV file is intentionally excluded from GitHub because it is large.

Place the downloaded file locally at:

```text
house_prices.csv
```

For the current local project setup, the notebook reads:

```text
C:\Me\house_price_model\house_prices.csv
```

## Architecture

```text
Kaggle House Price Dataset
          |
          v
   Jupyter Notebook
          |
          +--> Data Inspection
          |
          +--> Cleaning & Feature Engineering
          |
          +--> EDA
          |
          +--> Model Training
          |
          +--> Model Evaluation
          |
          +--> house_price.pkl
          |
          v
     FastAPI Backend
          |
          | POST /predict
          v
   React + TypeScript
          |
          v
   Predicted House Price
```

## Tech Stack

### Machine Learning
- Python
- pandas
- NumPy
- scikit-learn
- Matplotlib
- Seaborn
- Joblib

### Backend
- FastAPI
- Uvicorn
- Pydantic
- pydantic-settings
- pytest
- httpx

### Frontend
- React
- TypeScript
- Vite
- React Router

## Project Structure

```text
house_price_model/
├── house_prices.csv                 # local only — do not commit
├── house_price.ipynb
├── house_price_model.ipynb
├── house_price.pkl
├── locations.json
├── sklearn_version.txt
├── README.md
├── .gitignore
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       └── prediction.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── schemas/
│   │   │   └── prediction.py
│   │   ├── services/
│   │   │   ├── preprocessing.py
│   │   │   └── inference.py
│   │   ├── utils/
│   │   ├── main.py
│   │   └── __init__.py
│   ├── models/
│   │   ├── house_price.pkl
│   │   └── locations.json
│   ├── tests/
│   │   └── test_prediction.py
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
│
└── frontend/
    ├── public/
    │   └── locations.json
    ├── src/
    │   ├── api/
    │   │   └── predictionClient.ts
    │   ├── components/
    │   │   └── PredictionForm.tsx
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── ResultPage.tsx
    │   │   └── NotFoundPage.tsx
    │   ├── types/
    │   │   └── prediction.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── styles.css
    ├── .env.example
    ├── package.json
    └── vite.config.ts
```

## Notebook

The notebook performs the required workflow:

1. Load and inspect the real dataset.
2. Analyze missing values and data types.
3. Convert the target price from text such as `Lac` and `Cr` into rupees.
4. Convert carpet area to square feet.
5. Extract numeric floor values and handle `Ground` / `Basement`.
6. Convert bathroom, balcony, and car-parking values to numeric features.
7. Group high-cardinality locations into the top 50 plus `other`.
8. Remove useless columns.
9. Remove extreme price-per-square-foot outliers using the 1st and 99th percentiles.
10. Build a scikit-learn preprocessing pipeline.
11. Train at least two regression models.
12. Compare MAE, RMSE, and R² on the test set.
13. Produce a predicted-vs-actual plot.
14. Run optional 5-fold cross-validation.
15. Export the complete trained pipeline to `house_price.pkl`.
16. Export allowed grouped locations to `locations.json`.

## Model Results

Run the notebook first, then replace the placeholders below with the actual values printed by the notebook.

### Chosen Model

`<MODEL_NAME>`

| Metric | Value |
|---|---:|
| MAE | `<MAE>` |
| RMSE | `<RMSE>` |
| R² | `<R2>` |

### Model Comparison

| Model | MAE | RMSE | R² |
|---|---:|---:|---:|
| LinearRegression | `<value>` | `<value>` | `<value>` |
| RandomForestRegressor | `<value>` | `<value>` | `<value>` |

### Conclusion

The selected model should be the model with the strongest overall held-out test performance. The decision should be based on the test-set MAE, RMSE, and R² rather than training-set metrics.

## Backend Setup

Open a terminal in:

```text
C:\Me\house_price_model\backend
```

Create and activate a virtual environment if needed.

### Windows

```powershell
python -m venv .venv
.venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

The project pins the scikit-learn version used when the model was trained.

### Run FastAPI

```powershell
python -m uvicorn app.main:app --reload
```

API:

```text
http://localhost:8000
```

Swagger:

```text
http://localhost:8000/docs
```

## Environment Variables — Backend

Create `.env` from `.env.example`.

| Variable | Example | Purpose |
|---|---|---|
| `FRONTEND_ORIGIN` | `http://localhost:5173` | CORS origin |
| `MODEL_PATH` | `models/house_price.pkl` | Serialized model path |

## API Reference

### Health

```text
GET /health
```

Example:

```bash
curl http://localhost:8000/health
```

Response:

```json
{
  "status": "ok"
}
```

### Prediction

```text
POST /predict
```

Example request:

```json
{
  "location": "mumbai",
  "carpet_area_sqft": 1200,
  "floor_num": 5,
  "bathroom": 2,
  "balcony": 1,
  "furnishing": "Unfurnished",
  "transaction": "Resale",
  "ownership": "Freehold",
  "facing": "East"
}
```

Example response:

```json
{
  "predicted_price": 0
}
```

The actual response value depends on the trained model.

## Backend Tests

From the `backend` directory:

```powershell
pytest -q
```

The test suite covers:

- `/health`
- a valid `/predict` request
- invalid input returning HTTP `422`

## Frontend Setup

Open a second terminal in:

```text
C:\Me\house_price_model\frontend
```

Install dependencies:

```powershell
npm install
```

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Run the frontend:

```powershell
npm run dev
```

Open:

```text
http://localhost:5173
```

Build for production:

```powershell
npm run build
```

## Frontend Features

- Location dropdown populated from `locations.json`
- Furnishing dropdown
- Transaction dropdown
- Numeric area input
- Numeric floor input
- Numeric bathroom input
- Numeric balcony input
- Client-side validation
- Loading state during prediction
- Error handling for failed API requests
- Result page with formatted Indian-rupee price
- React Router routes:
  - `/`
  - `/result`
  - `*` (404)

## End-to-End Flow

```text
User enters property details
          |
          v
React form validation
          |
          v
POST /predict
          |
          v
FastAPI
          |
          v
One-row DataFrame
          |
          v
Trained scikit-learn Pipeline
          |
          v
Predicted price
          |
          v
React Result Page
```

## Screenshots

Add screenshots of the running application before final submission.

Suggested screenshots:

1. Home / prediction form
2. Swagger `/health`
3. Swagger `/predict`
4. Final prediction result page
5. Optional model evaluation plot

Example:

```md
![Prediction form](screenshots/form.png)
![Prediction result](screenshots/result.png)
```

## GitHub Publishing

Before the first commit, make sure `.gitignore` exists and excludes:

- `.venv/`
- `__pycache__/`
- `node_modules/`
- `dist/`
- `.env`
- logs
- raw dataset CSV

Initialize Git:

```powershell
cd C:\Me\house_price_model
git init
```

Check files:

```powershell
git status
```

Stage files:

```powershell
git add .
```

Commit:

```powershell
git commit -m "House price prediction: notebook, FastAPI backend, React frontend"
```

Create a public GitHub repository, then:

```powershell
git branch -M main
git remote add origin https://github.com/<your-username>/house-price-app.git
git push -u origin main
```

## Final Verification Checklist

- [ ] Notebook runs top-to-bottom
- [ ] EDA contains at least 4 meaningful plots
- [ ] Data cleaning and feature engineering are complete
- [ ] At least 2 models are compared
- [ ] Test MAE / RMSE / R² are reported
- [ ] `house_price.pkl` is exported
- [ ] `locations.json` is exported
- [ ] FastAPI `/health` returns 200
- [ ] FastAPI `/predict` returns a real prediction
- [ ] Backend tests pass
- [ ] Frontend builds successfully with `npm run build`
- [ ] End-to-end form → API → model → result works
- [ ] `.gitignore` excludes secrets and raw data
- [ ] README contains screenshots and final model metrics
- [ ] Public GitHub repository is accessible
