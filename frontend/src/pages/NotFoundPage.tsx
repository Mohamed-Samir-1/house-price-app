import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="page">
      <div className="card result-card">
        <h1>404</h1>

        <p>
          Page not found.
        </p>

        <Link className="primary" to="/">
          Go Home
        </Link>
      </div>
    </main>
  );
}