import { Link } from "react-router-dom";
import "../styles/register.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

function Register() {
  const {handleRegister,Loading} = useAuth();
const [name, setname] = useState("");
const [email, setemail] = useState("");
const [password, setpassword] = useState("");

const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await handleRegister({name,email,password});
navigate("/login");
  
  }
  if(Loading) return <div>Loading...</div>
  return (
    <div className="register-page">

      <div className="register-card">

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Enter your name"
          />

          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />

          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
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