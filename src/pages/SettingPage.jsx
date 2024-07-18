import axios from "axios";
import React, { useState } from "react";
import {
  HiUser,
  HiLockClosed,
  HiOutlineSave,
  HiOutlineX,
} from "react-icons/hi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { APP_URL } from "../utils";

const SettingsPage = () => {
  const user = useSelector((state) => state.user.user);
  const [accountSettings, setAccountSettings] = useState({
    email: "",
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
      alert(response?.data?.message);
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <HiUser className="mr-2 w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-semibold">Account</h2>
          </div>
          {/* Individual Account Settings Items */}
          {/* Username */}
          <form onSubmit={handleSaving}>
            <div className="mb-4">
              <label htmlFor="username" className="block font-medium mb-2">
                Email
              </label>
              <input
                id="username"
                type="text"
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
                type="text"
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
                type="text"
                required
                className="block w-full border border-gray-300 rounded-md p-2"
                value={accountSettings.newpassword}
                onChange={(e) =>
                  setAccountSettings({
                    ...accountSettings,
                    newpassword: e.target.value,
                  })
                }
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              type="submit"
            >
              Update
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

      {/* Save and Cancel Buttons */}
      {/* <div className="flex justify-end mt-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={handleSave}
        >
          <HiOutlineSave className="mr-2 w-6 h-6" /> Save
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          onClick={handleCancel}
        >
          <HiOutlineX className="mr-2 w-6 h-6" /> Cancel
        </button>
      </div> */}
    </div>
  );
};

export default SettingsPage;
