import "../styles/userProfile.scss";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";

const UserProfile = () => {
const navigate = useNavigate();
const {logout} = useAuth();

const handleLogOut = async () => {
  await logout();
  navigate("/login");
};




  return (
    <div className="profile-container">
      <h1 className="mahadev">Har Har Mahadev</h1>
      <h2 className="progress">Development In Progress</h2>
      <p className="notes">Mere Notes Aap Ke Liye 🙏</p>
      <button  className="log-out" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default UserProfile;