import { lazy } from "react";
import About from "../../components/About";
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const Home = lazy(() => import("../../pages/Home"));
const Shop = lazy(() => import("../../pages/Shop"));
const Card = lazy(() => import("../../pages/Card"));
const Shipping = lazy(() => import("../../pages/Shipping"));
const PrivateRoute = lazy(() => import("../../components/PrivateRoute"));
const Dashboard = lazy(() => import("../../pages/Dashboard"));
const Contact = lazy(() => import("../../components/Contact"));
const Checkout = lazy(() => import("../../components/Checkout"));
const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/card",
    element: (
      <PrivateRoute>
        <Card />
      </PrivateRoute>
    ),
  },
  {
    path: "/shipping",
    element: (
      <PrivateRoute>
        <Shipping />
      </PrivateRoute>
    ),
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },

  { path: "/checkout", element: <Checkout /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "*", element: <h1>404 Not Found</h1> },
];

export default publicRoutes;
