import axios from "axios";
import React, { useState } from "react";
import { APP_URL, reg } from "../utils";
import Logo from "./Logo";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reg.test(email)) {
      alert("Please provide a valid email.");
      return;
    }

    try {
      const res = await axios.post(`${APP_URL}/user/forget-password`, {
        email,
      });
      console.log(res.data);
      if (res.data?.status === "failed") {
        setErr(res.data);
      } else {
        alert(res.data?.message);

        setErr(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center justify-strt my-2">
          <Logo />
        </div>
        <div>
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="my-2 ">
                Email address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Please enter Email address"
              />
            </div>
            {err && (
              <span
                role="alert"
                className={`text-sm ${
                  err?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {err?.message}
              </span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: solid/lock-closed */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a2 2 0 012-2h10a2 2 0 012 2v7h2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h2V4zm2 2v5h10V6H5zm0 7v2h10v-2H5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
