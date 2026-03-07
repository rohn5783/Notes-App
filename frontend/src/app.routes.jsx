import { createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import UserProfile from "./components/pages/userProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />   // default login
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/profile",
    element: <UserProfile />
  }
]);

export default router;