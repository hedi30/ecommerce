import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loging } from "../../store/Reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { errorMessage, successMessage, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  // Single useEffect for handling navigation and messages
  useEffect(() => {
    if (isAuthenticated) {
      if (successMessage) {
        toast.success(successMessage);
      }
      navigate(from);
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [isAuthenticated, successMessage, errorMessage, navigate, from]);

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    dispatch(loging(state));
  };
  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="w-[400px] text-gray-100 p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
          <h2 className="text-2xl mb-6 font-bold text-center bg-black from-black to-white bg-clip-text text-transparent">
            Welcome Back
          </h2>

          <p className="text-sm mb-8 text-center text-gray-400">
            Please sign in to continue
          </p>

          <form onSubmit={submit} className="space-y-6">
            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-400"
              >
                Email Address
              </label>
              <input
                onChange={inputHandler}
                value={state.email}
                className="px-4 py-3 outline-none border border-gray-700 bg-gray-900 rounded-lg focus:border-purple-500 transition-colors"
                type="email"
                name="email"
                placeholder="name@example.com"
                id="email"
                required
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-400"
              >
                Password
              </label>
              <input
                onChange={inputHandler}
                value={state.password}
                className="px-4 py-3 outline-none border border-gray-700 bg-gray-900 rounded-lg focus:border-purple-500 transition-colors"
                type="password"
                name="password"
                placeholder="Enter your password"
                id="password"
                required
              />
            </div>

            <button className="w-full bg-black text-white rounded-lg px-8 py-3 font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-purple-500/25">
              Sign In
            </button>

            <div className="flex items-center justify-center text-sm text-gray-400">
              <p>
                Don't have an account?{" "}
                <Link
                  className="font-medium text-white hover:text-purple-300 transition-colors"
                  to="/Register"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
