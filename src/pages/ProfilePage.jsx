import React, { useEffect, useState } from "react";
import axios from "axios";
import image from "../assets/Logo.png";
import { states, state } from "../utils/state";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { APP_URL } from "../utils";

const ProfilePage = () => {
  const { userId } = useParams();

  const [userData, setUserData] = useState(null);

  const getProfileData = async () => {
    try {
      const response = await axios.get(`${APP_URL}/user/get-profile/` + userId);
      setUserData(response.data);
      return response.data;
    } catch (error) {
      console.log("error in fetching data", error);
      return null;
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="w-full justify-between shadow-md p-4 rounded-lg bg-white">
      <h1 className="text-4xl font-bold mb-2 relative">
        <span
          style={{
            backgroundImage: "linear-gradient(to right, #FFA500, #FF6347)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Profile Page
        </span>
      </h1>
      <div className="flex flex-wrap">
        <div className="w-1/2 pr-4   flex items-center justify-center   ">
          <img
            src={userData?.profileUrl || image}
            alt="Sample Image"
            style={{ borderRadius: "70%", width: "70%", height: "70%" }}
          />
          <section className="text-center font-bold mt-4"></section>
        </div>
        <div className="w-1/2 pl-4">
          <form className="w-full">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="businessName"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Business Name*
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={userData?.fullName || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Please Edit your profile"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="gstin"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  GSTIN *
                </label>
                <input
                  type="text"
                  id="gstin"
                  name="gstin"
                  value={userData?.gstin || ""}
                  placeholder="Please Edit your profile"                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="phoneNo"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Phone No*
                </label>
                <input
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  value={userData?.phoneNo || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Please Edit your profile"                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="email"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Email*
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={userData?.email || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                {/* Other input fields */}
                <label
                  htmlFor="state"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  State*
                </label>
                <input
                  id="state"
                  name="state"
                  value={userData?.state || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                   placeholder="Please Edit your profile"
                  readOnly
                />
                
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="businessAddress"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Business Address*
                </label>
                <input
                  type="text"
                  id="businessAddress"
                  name="businessAddress"
                  value={userData?.businessAddress || ""}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                   placeholder="Please Edit your profile"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="pincode"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Pincode*
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={userData?.pincode || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                   placeholder="Please Edit your profile"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="businessDetails"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Business Details*
                </label>
                <textarea
                  id="businessDetails"
                  name="businessDetails"
                  value={userData?.desc || ""}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  rows="5"
                  readOnly
                ></textarea>
              </div>
            </div>
            <div className="mt-2">
              <Link
                to={"/profile/edit/"+userId}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                Edit Profile
              </Link>
            </div>
          </form>
        </div>
        <div className="text-center mt-4 font-bold">
          &copy; 2024 SphereCode Private Limited
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
