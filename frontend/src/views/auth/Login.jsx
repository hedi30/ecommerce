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
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center ">
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <h2 className="text-xl mb-3 font-bold">Welcome</h2>

          <p className="text-sm mb-3 font-medium">please Login </p>

          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email </label>
              <input
                onChange={inputHandler}
                value={state.email}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="email"
                name="email"
                placeholder="email"
                id="email"
                required
              ></input>
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">password </label>
              <input
                onChange={inputHandler}
                value={state.password}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
              ></input>
            </div>

            <button className="bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
              Login
            </button>

            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Don't have an account?
                <Link className="font-bold" to="/Register">
                  Register
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
