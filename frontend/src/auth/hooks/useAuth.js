import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  getUserById,
} from "../../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;
//  handle login
  async function handleLogin({ email, password }) {
    console.log("api running");
    try {
      setLoading(true);
      const response = await loginApi({ email, password });
      setUser(response.user ?? null);
    } catch (error) {
      console.log(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }
//  handle register
  async function handleRegister({ userName, email, password }) {
    try {
      setLoading(true);
      const response = await registerApi({ userName, email, password });
      setUser(response.user ?? null);
    } catch (error) {
      console.log(error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  //  handle logout
  async function logout() {
    try {
      setLoading(true);
      await logoutApi();
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setUser(null);
      setLoading(false);
    }
  }
//  handle getuser
  async function getUser(id) {
    try {
      setLoading(true);
      const response = await getUserById(id);
      setUser(response.user);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  return { user, loading, handleLogin, handleRegister, logout, getUser };
};
