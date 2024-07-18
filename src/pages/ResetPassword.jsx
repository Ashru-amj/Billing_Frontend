import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APP_URL } from "../utils";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userId, token } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Password not matched");
      return;
    }
    console.log(confirmPassword, userId);

    try {
      const res = await axios.post(
        `${APP_URL}/user/update-password`,
        { userId, password: confirmPassword, token }
      );

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

  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setErrMsg("password not matched");
    } else {
      setErrMsg("");
    }
  }, [confirmPassword]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password?
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4 w-full  ">
              <label htmlFor="newPassword" className="block mb-2">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4 w-full  ">
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              {errMsg && (
                <span className="text-xs text-[#f64949fe] mt-0.5 ">
                  {errMsg}
                </span>
              )}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
