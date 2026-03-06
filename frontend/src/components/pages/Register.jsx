import { Link } from "react-router-dom";
import "../styles/register.scss";

function Register() {
  return (
    <div className="register-page">

      <div className="register-card">

        <h2>Create Account</h2>

        <form>

          <input
            type="text"
            placeholder="Enter your name"
          />

          <input
            type="email"
            placeholder="Enter your email"
          />

          <input
            type="password"
            placeholder="Enter password"
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p className="bottom-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;