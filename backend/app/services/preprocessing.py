import pandas as pd


MODEL_COLUMNS = [
    "carpet_area_sqft",
    "floor_num",
    "bathroom",
    "balcony",
    "location_grouped",
    "Furnishing",
    "Transaction",
    "Ownership",
    "facing",
]


def request_to_dataframe(
    payload: dict,
    allowed_locations: set[str]
) -> pd.DataFrame:

    location = str(payload["location"]).strip()

    if location not in allowed_locations:
        location = "other"

    row = {
        "carpet_area_sqft": float(payload["carpet_area_sqft"]),
        "floor_num": int(payload["floor_num"]),
        "bathroom": int(payload["bathroom"]),
        "balcony": int(payload["balcony"]),
        "location_grouped": location,
        "Furnishing": str(payload["furnishing"]).strip(),
        "Transaction": str(payload["transaction"]).strip(),
        "Ownership": str(payload["ownership"]).strip(),
        "facing": str(payload["facing"]).strip(),
    }

    return pd.DataFrame(
        [row],
        columns=MODEL_COLUMNS
    )