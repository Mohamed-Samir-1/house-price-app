from pathlib import Path
import json
import joblib


# backend/
# ├── app/
# └── models/
BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = BASE_DIR / "models" / "house_price.pkl"
LOCATIONS_PATH = BASE_DIR / "models" / "locations.json"


def load_artifacts():
    """
    Load the trained model and allowed locations once
    when FastAPI starts.
    """

    model = joblib.load(MODEL_PATH)

    locations = set(
        json.loads(
            LOCATIONS_PATH.read_text(encoding="utf-8")
        )
    )

    return model, locations


def predict_price(model, frame):
    """
    Receive a one-row DataFrame and return
    the model's predicted house price.
    """

    prediction = model.predict(frame)

    return float(prediction[0])