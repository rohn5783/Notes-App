
import { Link } from "react-router-dom";
import "../styles/register.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

function Register() {
  const { handleRegister, Loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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


  if (Loading) return <div>Loading...</div>;

  return (
    <div className="register-page">
      <div className="register-card">

        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            required
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            required
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            required
          />

          <button type="submit" disabled={Loading}>
            {Loading ? "Registering..." : "Register"}
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
