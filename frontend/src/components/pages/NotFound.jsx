import { Link } from "react-router-dom";
import "../styles/notfound.scss";

function NotFound() {
  return (
    <div className="notfound-page">

      <div className="background-blur"></div>

      <div className="notfound-card">

        <div className="error-code">
          <span>4</span>
          <span className="zero">0</span>
          <span>4</span>
        </div>

        <h2>Oops! Page not found</h2>

        <p>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="actions">

          <Link to="/" className="home-btn">
            Go Home
          </Link>

          <button
            className="back-btn"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>

        </div>

      </div>

    </div>
  );
}

export default NotFound;