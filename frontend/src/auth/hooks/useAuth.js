import { login, register, logout as logoutApi, getUserById } from "../../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

export const useAuth = () => {

  const context = useContext(AuthContext);
  const { user, setUser, isLoading, setIsLoading } = context;

  // login
  async function handleLogin({ email, password }) {
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

  // register
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

  // logout
  async function handleLogout() {
    try {
      setIsLoading(true);

      await logoutApi(); // backend logout

      setUser(null);

    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // get user by id
  async function getUser(id) {
    try {
      setIsLoading(true);

      const response = await getUserById(id);

      setUser(response.user);

    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    user,
    isLoading,
    handleLogin,
    handleRegister,
    handleLogout,
    getUser
  };
};