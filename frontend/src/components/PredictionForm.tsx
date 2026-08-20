import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [form, setForm] = useState<PredictionRequest>(initialForm);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

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

    if (form.bathroom < 0 || form.balcony < 0) {
      setError("Bathrooms and balconies cannot be negative.");
      return;
    }

    setLoading(true);

    try {
      const result = await predictPrice(form);

      navigate("/result", {
        state: {
          predictedPrice: result.predicted_price,
        },
      });
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

  return (
    <form className="card form-grid" onSubmit={handleSubmit}>
      <label>
        Location

        <select
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          required
        >
          <option value="" disabled>
            Select location
          </option>

          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      <label>
        Carpet Area (sqft)

        <input
          type="number"
          min="1"
          step="1"
          value={form.carpet_area_sqft}
          onChange={(e) =>
            updateField("carpet_area_sqft", Number(e.target.value))
          }
          required
        />
      </label>

      <label>
        Floor

        <input
          type="number"
          min="-1"
          step="1"
          value={form.floor_num}
          onChange={(e) =>
            updateField("floor_num", Number(e.target.value))
          }
          required
        />
      </label>

      <label>
        Bathrooms

        <input
          type="number"
          min="0"
          step="1"
          value={form.bathroom}
          onChange={(e) =>
            updateField("bathroom", Number(e.target.value))
          }
          required
        />
      </label>

      <label>
        Balconies

        <input
          type="number"
          min="0"
          step="1"
          value={form.balcony}
          onChange={(e) =>
            updateField("balcony", Number(e.target.value))
          }
          required
        />
      </label>

      <label>
        Furnishing

        <select
          value={form.furnishing}
          onChange={(e) =>
            updateField("furnishing", e.target.value)
          }
          required
        >
          <option value="Furnished">Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
      </label>

      <label>
        Transaction

        <select
          value={form.transaction}
          onChange={(e) =>
            updateField("transaction", e.target.value)
          }
          required
        >
          <option value="New Property">New Property</option>
          <option value="Resale">Resale</option>
        </select>
      </label>

      <label>
        Ownership

        <select
          value={form.ownership}
          onChange={(e) =>
            updateField("ownership", e.target.value)
          }
          required
        >
          <option value="Freehold">Freehold</option>
          <option value="Leasehold">Leasehold</option>
          <option value="Co-operative Society">
            Co-operative Society
          </option>
          <option value="Power of Attorney">
            Power of Attorney
          </option>
        </select>
      </label>

      <label>
        Facing

        <select
          value={form.facing}
          onChange={(e) => updateField("facing", e.target.value)}
          required
        >
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="North-East">North-East</option>
          <option value="North-West">North-West</option>
          <option value="South-East">South-East</option>
          <option value="South-West">South-West</option>
        </select>
      </label>

      {error && (
        <p className="error full-width">
          {error}
        </p>
      )}

      <button
        className="primary full-width"
        type="submit"
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict House Price"}
      </button>
    </form>
  );
}