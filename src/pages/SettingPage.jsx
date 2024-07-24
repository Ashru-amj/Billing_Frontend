import axios from "axios";
import React, { useState } from "react";
import {
  HiUser,
  HiLockClosed,
  HiOutlineSave,
  HiOutlineX,
} from "react-icons/hi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useSelector } from "react-redux";
import { APP_URL } from "../utils";
import toast, { Toaster } from 'react-hot-toast';

const SettingsPage = () => {
  const user = useSelector((state) => state.user.user);
  const [accountSettings, setAccountSettings] = useState({
    email: user?.user?.email || "",
    oldpassword: "",
    newpassword: "",
  });

  const handleSaving = async (e) => {
    e.preventDefault();
    const url = `${APP_URL}/user/reset-password`;
    try {
      const response = await axios.post(
        url,
        {
          userId: user?.user._id,
          email: accountSettings.email,
          oldpassword: accountSettings.oldpassword,
          newpassword: accountSettings.newpassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setAccountSettings({
        email: "",
        oldpassword: "",
        newpassword: "",
      });
      toast.success(response?.data?.message, {
        style: {
          border: '1px solid #4caf50',
          padding: '16px',
          color: '#4caf50',
        },
        iconTheme: {
          primary: '#4caf50',
          secondary: '#FFFAEE',
        },
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred while resetting the password. Please try again later.", {
        style: {
          border: '1px solid #f44336',
          padding: '16px',
          color: '#f44336',
        },
        iconTheme: {
          primary: '#f44336',
          secondary: '#FFFAEE',
        },
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <HiUser className="mr-2 w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-semibold">Account</h2>
          </div>
          {/* Individual Account Settings Items */}
          <form onSubmit={handleSaving}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="block w-full border border-gray-300 rounded-md p-2"
                value={accountSettings.email}
                onChange={(e) =>
                  setAccountSettings({
                    ...accountSettings,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="oldpassword" className="block font-medium mb-2">
                Old Password
              </label>
              <input
                id="oldpassword"
                type="password"
                className="block w-full border border-gray-300 rounded-md p-2"
                value={accountSettings.oldpassword}
                onChange={(e) =>
                  setAccountSettings({
                    ...accountSettings,
                    oldpassword: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newpassword" className="block font-medium mb-2">
                New Password
              </label>
              <input
                id="newpassword"
                type="password"
                className="block w-full border border-gray-300 rounded-md p-2"
                value={accountSettings.newpassword}
                onChange={(e) =>
                  setAccountSettings({
                    ...accountSettings,
                    newpassword: e.target.value,
                  })
                }
                required
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              type="submit"
            >
              <HiOutlineSave className="inline-block mr-1" /> Update
            </button>
          </form>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <HiLockClosed className="mr-2 w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-semibold">Privacy</h2>
          </div>
          <ul>
            <li className="flex items-center mb-2">
              <MdOutlinePrivacyTip className="mr-2 w-6 h-6 text-blue-500" />
              <span>
                Implement end-to-end encryption to protect user data during
                transmission.
              </span>
            </li>
            <li className="flex items-center mb-2">
              <MdOutlinePrivacyTip className="mr-2 w-6 h-6 text-blue-500" />
              <span>
                Regularly access permissions to ensure data is accessible by
                authorized personnel.
              </span>
            </li>
            <li className="flex items-center  mb-2">
              <MdOutlinePrivacyTip className="mr-2 w-6 h-6 text-blue-500 " />
              <span>
                Users control over their privacy settings, allowing data sharing
                preferences.
              </span>
            </li>
            <li className="flex items-center mb-2">
              <MdOutlinePrivacyTip className="mr-2 w-6 h-6 text-blue-500" />
              <span>
                Ensure compliance with relevant privacy regulations such as GDPR
                or CCPA.
              </span>
            </li>
          </ul>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <HiLockClosed className="mr-2 w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <p className="mb-4">
            Your security is our top priority. Here are some important security
            measures you should be aware of:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Never share your password with anyone.</li>
            <li>Use strong, unique passwords for each account.</li>
            <li>
              Avoid using public Wi-Fi networks for sensitive transactions.
            </li>
          </ul>
          <p>
            Remember, protecting your personal information and data is essential
            in today's digital world. If you have any security concerns or
            notice any unusual activity, please contact our support team
            immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
