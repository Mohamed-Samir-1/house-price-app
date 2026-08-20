from fastapi.testclient import TestClient

from app.main import app


def test_health():
    with TestClient(app) as client:
        response = client.get("/health")

        assert response.status_code == 200
        assert response.json() == {"status": "ok"}


def test_predict_happy_path():
    with TestClient(app) as client:
        locations = sorted(app.state.allowed_locations)
        location = locations[0] if locations else "other"

        payload = {
            "location": location,
            "carpet_area_sqft": 1200,
            "floor_num": 5,
            "bathroom": 2,
            "balcony": 1,
            "furnishing": "Unfurnished",
            "transaction": "Resale",
            "ownership": "Freehold",
            "facing": "East"
        }

        response = client.post("/predict", json=payload)

        assert response.status_code == 200
        assert isinstance(
            response.json()["predicted_price"],
            (int, float)
        )


def test_predict_invalid_input():
    with TestClient(app) as client:
        payload = {
            "location": "other",
            "carpet_area_sqft": -1,
            "floor_num": 5,
            "bathroom": 2,
            "balcony": 1,
            "furnishing": "Unfurnished",
            "transaction": "Resale",
            "ownership": "Freehold",
            "facing": "East"
        }

        response = client.post("/predict", json=payload)

        assert response.status_code == 422