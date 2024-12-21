import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../store/Reducers/authReducer";
import { toast } from "react-hot-toast";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(register(state));
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="w-[400px] text-gray-200 p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
          <h2 className="text-2xl mb-4 font-bold text-white">Welcome</h2>

          <p className="text-sm mb-6 text-gray-400">Please create an account</p>

          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-2 mb-4">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-400"
              >
                Name
              </label>
              <input
                className="px-4 py-3 outline-none border border-gray-700 bg-gray-900 rounded-lg focus:border-indigo-500 transition-colors"
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={inputHandler}
                value={state.name}
                id="name"
                required
              ></input>
            </div>

            <div className="flex flex-col w-full gap-2 mb-4">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-400"
              >
                Email
              </label>
              <input
                className="px-4 py-3 outline-none border border-gray-700 bg-gray-900 rounded-lg focus:border-indigo-500 transition-colors"
                type="email"
                onChange={inputHandler}
                value={state.email}
                name="email"
                placeholder="Enter your email"
                id="email"
                required
              ></input>
            </div>

            <div className="flex flex-col w-full gap-2 mb-6">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-400"
              >
                Password
              </label>
              <input
                className="px-4 py-3 outline-none border border-gray-700 bg-gray-900 rounded-lg focus:border-indigo-500 transition-colors"
                type="password"
                onChange={inputHandler}
                value={state.password}
                name="password"
                placeholder="Enter your password"
                id="password"
                required
              ></input>
            </div>

            <button className="bg-black w-full text-white rounded-lg px-8 py-3 mb-4 font-medium">
              Register
            </button>

            <div className="flex items-center gap-2 justify-center text-sm">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
