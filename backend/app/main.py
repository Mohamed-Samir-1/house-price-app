from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.services.inference import load_artifacts
from app.api.routes.prediction import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model and allowed locations once when the API starts
    model, locations = load_artifacts()

    app.state.model = model
    app.state.allowed_locations = locations

    yield


app = FastAPI(
    title="House Price Prediction API",
    description="ML API for predicting Indian house prices.",
    version="1.0.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "House Price Prediction API is running"
    }