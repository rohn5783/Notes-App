import { Link } from "react-router-dom";
import "../styles/login.scss";
import { useAuth } from "../../auth/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {

  const { handleLogin, Loading } = useAuth();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await handleLogin({ email, password });
      navigate("/profile");
      console.log("login successful");
    } catch (error) {
      console.log(error.response?.data);
    }
  }

  if (Loading)
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="login-page">

      <div className="background-blur"></div>

      <div className="login-card">

        <h2> Login </h2>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          {/* Password Field */}

          <div className="input-group password-group">

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />

            <label>Password</label>

            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

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