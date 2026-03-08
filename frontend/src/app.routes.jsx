import { createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import UserProfile from "./components/pages/userProfile";
import Protected from "./auth/protected.jsx";

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
    element:<Protected><UserProfile /></Protected>
  }
]);

export default router;