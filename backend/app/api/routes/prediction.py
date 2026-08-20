from fastapi import APIRouter, Request

from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse,
)

from app.services.preprocessing import request_to_dataframe
from app.services.inference import predict_price


router = APIRouter()


@router.get("/health")
def health():
    return {
        "status": "ok"
    }


@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(payload: PredictionRequest, request: Request):

    # Convert Pydantic request to dictionary
    data = payload.model_dump()

    # Convert request into the exact DataFrame
    # expected by the trained pipeline.
    frame = request_to_dataframe(
        data,
        request.app.state.allowed_locations
    )

    # Run prediction using the model loaded at startup.
    price = predict_price(
        request.app.state.model,
        frame
    )

    return {
        "predicted_price": price
    }