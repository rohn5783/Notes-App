import { Link } from "react-router-dom";
import "../styles/register.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {

  const { handleRegister, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    setError("");

    await handleRegister({
      userName: name,
      email: email,
      password: password
    });

    navigate("/profile");
  }

  if (loading)
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="register-page">

      <div className="background-blur"></div>

      <div className="register-card">

        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
            <label>Name</label>
          </div>

          <div className="input-group">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <label>Email</label>
          </div>

          {/* Password Field */}

          <div className="input-group password-group">

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
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

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
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