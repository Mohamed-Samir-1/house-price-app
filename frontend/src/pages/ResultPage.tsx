import { Link, useLocation } from "react-router-dom";

interface ResultState {
  predictedPrice?: number;
}

export default function ResultPage() {
  const location = useLocation();

  const state = location.state as ResultState | null;

  const predictedPrice = state?.predictedPrice;

  if (typeof predictedPrice !== "number") {
    return (
      <main className="page">
        <div className="card result-card">
          <h1>No Prediction Found</h1>

          <p>
            Please submit the prediction form first.
          </p>

          <Link className="primary" to="/">
            Back to Form
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="card result-card">
        <p className="eyebrow">
          Prediction Result
        </p>

        <h1>
          Estimated House Price
        </h1>

        <div className="price">
          ₹{" "}
          {predictedPrice.toLocaleString(
            "en-IN",
            {
              maximumFractionDigits: 0,
            }
          )}
        </div>

        <Link className="primary" to="/">
          Predict Another Property
        </Link>
      </div>
    </main>
  );
}