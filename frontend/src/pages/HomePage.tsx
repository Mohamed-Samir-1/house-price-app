import PredictionForm from "../components/PredictionForm";

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero-topline">
          <span className="hero-dot" />
          <span>INDIAN REAL ESTATE • MACHINE LEARNING</span>
        </div>

        <p className="eyebrow">
          End-to-End Machine Learning
        </p>

        <h1>
          House Price
          <span> Predictor</span>
        </h1>

        <p className="hero-description">
          Estimate residential property prices in India using a machine
          learning model trained on real estate data and property features.
        </p>

        <div className="hero-meta">
          <div className="meta-item">
            <span className="meta-icon">🇮🇳</span>

            <div>
              <strong>Indian Market</strong>
              <small>السوق العقاري الهندي</small>
            </div>
          </div>

          <div className="meta-divider" />

          <div className="meta-item">
            <span className="meta-icon">ML</span>

            <div>
              <strong>AI Powered</strong>
              <small>مدعوم بالذكاء الاصطناعي</small>
            </div>
          </div>

          <div className="meta-divider" />

          <div className="meta-item">
            <span className="meta-icon">₹</span>

            <div>
              <strong>Indian Rupee</strong>
              <small>الروبية الهندية</small>
            </div>
          </div>
        </div>
      </section>

      <section className="prediction-header">
        <div>
          <span className="section-kicker">
            PROPERTY DETAILS
          </span>

          <h2>
            Enter property information
          </h2>

          <p>
            أدخل بيانات العقار للحصول على السعر المتوقع.
          </p>
        </div>

        <div className="india-badge">
          🇮🇳 India
        </div>
      </section>

      <PredictionForm />

      <section className="info-strip">
        <div className="info-strip-icon">
          i
        </div>

        <div>
          <strong>
            How does the prediction work?
          </strong>

          <p>
            The model analyzes location, carpet area, floor,
            bathrooms, balconies, furnishing, transaction type,
            ownership and property facing to estimate the price.
          </p>
        </div>
      </section>
    </main>
  );
}