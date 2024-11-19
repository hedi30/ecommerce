import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center ">
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <h2 className="text-xl mb-3 font-bold">Welcome</h2>

          <p className="text-sm mb-3 font-medium">please register </p>

          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name </label>
              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="text"
                name="name"
                placeholder="name"
                onChange={inputHandler}
                value={state.name}
                id="name"
                required
              ></input>
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email </label>
              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="email"
                onChange={inputHandler}
                value={state.email}
                name="email"
                placeholder="email"
                id="email"
                required
              ></input>
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">password </label>
              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="password"
                onChange={inputHandler}
                value={state.password}
                name="password"
                placeholder="password"
                id="password"
                required
              ></input>
            </div>

            <button className="bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
              Register
            </button>

            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already have an account?
                <Link className="font-bold" to="/login">
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
