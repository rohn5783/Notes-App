import { useAuth } from "./hooks/useAuth";
import { Navigate,useNavigate } from "react-router-dom";


const Protected = ({ children }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/login");
  }

  return <>{children}</>;
};

export default Protected;