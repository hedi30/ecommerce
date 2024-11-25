import { lazy } from "react";
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const Home = lazy(() => import("../../pages/Home"));
const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/Register",
    element: <Register />,
  },

  {
    path: "/",
    element: <Home />,
  },
];
export default publicRoutes;
