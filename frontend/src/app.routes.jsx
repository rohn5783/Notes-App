import { createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import UserProfile from "./components/pages/UserProfile";
import Protected from "./auth/protected.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import Notes from "./components/pages/Notes.jsx";

const router = createBrowserRouter([
  
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
  },
  {
    path: "/notes",
    element: <Protected><Notes /></Protected>
  }
]);

export default router;