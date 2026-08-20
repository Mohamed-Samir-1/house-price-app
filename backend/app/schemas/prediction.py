from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    location: str = Field(min_length=1)

    carpet_area_sqft: float = Field(gt=0)

    floor_num: int

    bathroom: int = Field(ge=0)

    balcony: int = Field(ge=0)

    furnishing: str = Field(min_length=1)

    transaction: str = Field(min_length=1)

    ownership: str = Field(min_length=1)

    facing: str = Field(min_length=1)


class PredictionResponse(BaseModel):
    predicted_price: float