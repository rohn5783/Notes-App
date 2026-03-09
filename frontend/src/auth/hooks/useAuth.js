import { login, register, logout } from "../../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, isLoading, setIsLoading } = context;

  async function handleLogin({ email, password }) {
    console.log("api running");
    try {
      setIsLoading(true);
      const response = await login({ email, password });
      setUser(response.user);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister({ userName, email, password }) {
    try {
      setIsLoading(true);
      const response = await register({ userName, email, password });
      setUser(response.user);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function logout() {
    setIsLoading(true);
    // const response = await register({email, password});
    setUser(null);
    setIsLoading(false);
  }

  return { user, isLoading, handleLogin, handleRegister, logout };
};
