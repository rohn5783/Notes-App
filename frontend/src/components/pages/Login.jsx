import { Link } from "react-router-dom";
import "../styles/login.scss";

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Login</h2>

        <form>

          <input 
            type="email"
            placeholder="Enter your email or Username"
          />

          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account? 
          <Link to="/register"> Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;