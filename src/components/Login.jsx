import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { APP_URL, reg } from "../utils";
import toast, { Toaster } from 'react-hot-toast';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    if (!reg.test(email)) {
      toast.error("Please provide a valid email.");
      return;
    }
    const url = `${APP_URL}/user/login`;

    // Use toast.promise to handle async operation
    toast.promise(
      axios.post(url, { email, password }),
      {
        loading: "Logging in...",
        success: (response) => {
          setEmail("");
          setPassword("");
          if (response.data.success) {
            dispatch(setUser(response.data));
            setTimeout(() => {
              navigate("/dashboard");
            }, 200); // Adjust timing if needed
          }
          return response.data.message;
        },
        error: (error) => {
          console.error("Error logging in:", error.message);
          return "Add your credential data correctly.";
        },
      }
    );  
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Toaster position="top-center" /> {/* Ensure Toaster is at the top-right */}
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <div className="flex items-center justify-center my-6">
          <Logo />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Sign In
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Create an account?
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="mt-4 text-center text-gray-600">
          <Link to="/auth/forget" className="text-blue-500 hover:underline">
            Forget password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
