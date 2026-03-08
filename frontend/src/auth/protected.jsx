import React, { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return null; 

  return children;
};

export default Protected;
