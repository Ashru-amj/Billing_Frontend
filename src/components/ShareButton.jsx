import axios from "axios";
import { useState } from "react";
import { APP_URL } from "../utils";

const ShareButton = ({ isOpen, setIsOpen, data }) => {
  const [email, setEmail] = useState("");
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(email);
    const url = `${APP_URL}/utils/generate-invoice-pdf`;
    try {
      const response = await axios.post(url,{ data,email});
      console.log(response.data);
    } catch (error) {}
    alert(email);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rounded-md">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-0 mt-4 mr-4 text-red-600 hover:text-red-800 focus:outline-none"
            >
              {/* Heroicon name: solid/x */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Mail sender
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Enter the email address below where you can share invoice
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
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
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send Pdf Through Mail
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;
