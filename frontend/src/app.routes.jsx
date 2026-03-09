import { createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import UserProfile from "./components/pages/userProfile";
import Protected from "./auth/protected.jsx";
import NotFound from "./components/pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login /> 
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
  },
  {
path: "*",
element: <NotFound />
  }
]);

export default router;