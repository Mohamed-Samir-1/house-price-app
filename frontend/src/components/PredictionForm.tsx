import { useEffect, useState, type FormEvent } from "react";

import { predictPrice } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";

const initialForm: PredictionRequest = {
  location: "",
  carpet_area_sqft: 1200,
  floor_num: 2,
  bathroom: 2,
  balcony: 1,
  furnishing: "Unfurnished",
  transaction: "Resale",
  ownership: "Freehold",
  facing: "East",
};

export default function PredictionForm() {
  const [form, setForm] =
    useState<PredictionRequest>(initialForm);

  const [locations, setLocations] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [predictedPrice, setPredictedPrice] =
    useState<number | null>(null);

  useEffect(() => {
    fetch("/locations.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load locations.");
        }

        return response.json();
      })
      .then((data: string[]) => {
        setLocations(data);

        if (data.length > 0) {
          setForm((current) => ({
            ...current,
            location: data[0],
          }));
        }
      })
      .catch((err: Error) => {
        setError(err.message);
      });
  }, []);

  function updateField(
    field: keyof PredictionRequest,
    value: string | number
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setPredictedPrice(null);

    if (!form.location) {
      setError("Please select a location.");
      return;
    }

    if (form.carpet_area_sqft <= 0) {
      setError("Carpet area must be greater than 0.");
      return;
    }

    if (form.floor_num < -1) {
      setError("Floor number is invalid.");
      return;
    }

    if (
      form.bathroom < 0 ||
      form.balcony < 0
    ) {
      setError(
        "Bathrooms and balconies cannot be negative."
      );
      return;
    }

    setLoading(true);

    try {
      const result = await predictPrice(form);

      setPredictedPrice(result.predicted_price);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "The prediction request failed."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleNewPrediction() {
    setPredictedPrice(null);
    setError("");

    setForm({
      location:
        locations.length > 0
          ? locations[0]
          : "",

      carpet_area_sqft: 0,
      floor_num: 0,
      bathroom: 0,
      balcony: 0,

      furnishing: "Unfurnished",
      transaction: "Resale",
      ownership: "Freehold",
      facing: "East",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <form
        className="card form-grid"
        onSubmit={handleSubmit}
      >
        {/* LOCATION */}

        <label>
          <span className="field-label">
            <span>Location</span>
            <small>الموقع</small>
          </span>

          <select
            value={form.location}
            onChange={(e) =>
              updateField(
                "location",
                e.target.value
              )
            }
            required
          >
            <option value="" disabled>
              Select location
            </option>

            {locations.map((location) => (
              <option
                key={location}
                value={location}
              >
                {location}
              </option>
            ))}
          </select>
        </label>

        {/* CARPET AREA */}

        <label>
          <span className="field-label">
            <span>Carpet Area (sqft)</span>
            <small>
              مساحة العقار بالقدم المربع
            </small>
          </span>

          <input
            type="number"
            min="1"
            step="1"
            value={
              form.carpet_area_sqft === 0
                ? ""
                : form.carpet_area_sqft
            }
            onChange={(e) =>
              updateField(
                "carpet_area_sqft",
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
            required
          />
        </label>

        {/* FLOOR */}

        <label>
          <span className="field-label">
            <span>Floor</span>
            <small>الطابق</small>
          </span>

          <input
            type="number"
            min="-1"
            step="1"
            value={
              form.floor_num === 0
                ? ""
                : form.floor_num
            }
            onChange={(e) =>
              updateField(
                "floor_num",
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
            required
          />
        </label>

        {/* BATHROOMS */}

        <label>
          <span className="field-label">
            <span>Bathrooms</span>
            <small>عدد الحمامات</small>
          </span>

          <input
            type="number"
            min="0"
            step="1"
            value={
              form.bathroom === 0
                ? ""
                : form.bathroom
            }
            onChange={(e) =>
              updateField(
                "bathroom",
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
            required
          />
        </label>

        {/* BALCONIES */}

        <label>
          <span className="field-label">
            <span>Balconies</span>
            <small>عدد الشرفات</small>
          </span>

          <input
            type="number"
            min="0"
            step="1"
            value={
              form.balcony === 0
                ? ""
                : form.balcony
            }
            onChange={(e) =>
              updateField(
                "balcony",
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
            required
          />
        </label>

        {/* FURNISHING */}

        <label>
          <span className="field-label">
            <span>Furnishing</span>
            <small>حالة الفرش</small>
          </span>

          <select
            value={form.furnishing}
            onChange={(e) =>
              updateField(
                "furnishing",
                e.target.value
              )
            }
            required
          >
            <option value="Furnished">
              Furnished
            </option>

            <option value="Semi-Furnished">
              Semi-Furnished
            </option>

            <option value="Unfurnished">
              Unfurnished
            </option>
          </select>
        </label>

        {/* TRANSACTION */}

        <label>
          <span className="field-label">
            <span>Transaction</span>
            <small>نوع المعاملة</small>
          </span>

          <select
            value={form.transaction}
            onChange={(e) =>
              updateField(
                "transaction",
                e.target.value
              )
            }
            required
          >
            <option value="New Property">
              New Property
            </option>

            <option value="Resale">
              Resale
            </option>
          </select>
        </label>

        {/* OWNERSHIP */}

        <label>
          <span className="field-label">
            <span>Ownership</span>
            <small>نوع الملكية</small>
          </span>

          <select
            value={form.ownership}
            onChange={(e) =>
              updateField(
                "ownership",
                e.target.value
              )
            }
            required
          >
            <option value="Freehold">
              Freehold
            </option>

            <option value="Leasehold">
              Leasehold
            </option>

            <option value="Co-operative Society">
              Co-operative Society
            </option>

            <option value="Power of Attorney">
              Power of Attorney
            </option>
          </select>
        </label>

        {/* FACING */}

        <label>
          <span className="field-label">
            <span>Facing</span>
            <small>اتجاه العقار</small>
          </span>

          <select
            value={form.facing}
            onChange={(e) =>
              updateField(
                "facing",
                e.target.value
              )
            }
            required
          >
            <option value="East">
              East
            </option>

            <option value="West">
              West
            </option>

            <option value="North">
              North
            </option>

            <option value="South">
              South
            </option>

            <option value="North-East">
              North-East
            </option>

            <option value="North-West">
              North-West
            </option>

            <option value="South-East">
              South-East
            </option>

            <option value="South-West">
              South-West
            </option>
          </select>
        </label>

        {/* ERROR */}

        {error && (
          <p className="error full-width">
            {error}
          </p>
        )}

        {/* SUBMIT */}

        <button
          className="primary full-width"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Predicting..."
            : "Predict House Price"}
        </button>
      </form>

      {/* PREDICTION RESULT */}

      {predictedPrice !== null && (
        <section className="card prediction-result">
          <p className="result-eyebrow">
            PREDICTION RESULT
          </p>

          <div className="result-check">
            ✓
          </div>

          <h2>
            Estimated House Price
          </h2>

          <p className="result-description">
            Based on the property details you
            provided, our machine learning model
            estimates the following price.
          </p>

          <p className="price-label">
            ESTIMATED VALUE
          </p>

          <div
            className="prediction-price"
            dir="ltr"
          >
            <span className="currency-symbol">
              ₹
            </span>

            <span className="price-number">
              {predictedPrice.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 0,
                }
              )}
            </span>
          </div>

          <p className="result-note">
            This is an estimated market value
            generated by the ML model.
          </p>

          <button
            type="button"
            className="secondary-action"
            onClick={handleNewPrediction}
          >
            Predict Another Property
          </button>
        </section>
      )}
    </>
  );
}