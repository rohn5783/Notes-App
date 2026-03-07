import { Link } from "react-router-dom";
import "../styles/login.scss";
import { useAuth } from "../../auth/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
   const {handleLogin,Loading} = useAuth();
const [email, setemail] = useState("");
const [password, setpassword] = useState("");

const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({email,password});
navigate("/profile");
  
  }
  if(Loading) return <div>Loading...</div>




  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input 
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter your email or Username"
          />

          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
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