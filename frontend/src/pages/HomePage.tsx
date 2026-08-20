import PredictionForm from "../components/PredictionForm";

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">
          End-to-End Machine Learning
        </p>

        <h1>
          House Price Predictor
        </h1>

        <p>
          Enter the property details below
          and get an estimated house price.
        </p>
      </section>

      <PredictionForm />
    </main>
  );
}