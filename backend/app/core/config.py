import os

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    frontend_origin: str = os.getenv(
        "FRONTEND_ORIGIN",
        "http://localhost:5173"
    )

    model_path: str = os.getenv(
        "MODEL_PATH",
        "models/house_price.pkl"
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()