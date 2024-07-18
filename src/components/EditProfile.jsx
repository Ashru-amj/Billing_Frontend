import React, { useEffect, useState } from "react";
import image from "../assets/Logo.png";
import { states } from "../utils/state";
import { useSelector } from "react-redux";
import axios from "axios";
import { APP_URL } from "../utils";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((state) => state.user).user;
  const [userData, setUserData] = useState(null);

  const [formValues, setFormValues] = useState(user.user || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNo") {
      if (!/^\d*$/.test(value) || value.length > 10) {
        setPhoneError("Please enter a valid phone number.");
      } else {
        setPhoneError("");
      }
    }

    // Pincode validation
    if (name === "pincode") {
      if (!/^\d*$/.test(value) || value.length > 6) {
        setPinError("Please enter a valid pincode.");
      } else {
        setPinError("");
      }
    }

    setFormValues({ ...formValues, [name]: value });
  };
  const { userId } = useParams();

  const getProfileData = async () => {
    try {
      const response = await axios.get(`${APP_URL}/user/get-profile/` + userId);
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.log("error in fetching data", error);
      return null;
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if phone number is exactly 10 digits
    if (formValues?.phoneNo.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return;
    }

    const obj = {
      userId: user?.user?._id,
      fullName: user?.user?.fullName,
      email: user?.user?.email,
      businessName: formValues?.businessName || "",
      pincode: formValues?.pincode || "",
      gstin: formValues?.gstin || "",
      state: formValues?.state || "",
      businessAddress: formValues?.businessAddress || "",
      desc: formValues?.businessDetails || "",
      phoneNo: formValues?.phoneNo || "",
    };
  
    const url = `${APP_URL}/user/update-profile`;
    const token = user.token;

    try {
      const response = await axios.put(url, obj, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full justify-between shadow-md p-4 rounded-lg bg-white">
      <h1 className="text-4xl font-bold   relative">
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
      <div className="flex flex-wrap  ">
        <div className="w-1/2 pr-4   flex items-center justify-center   ">
          <img
            src={user?.user?.profileUrl}
            alt="Sample Image"
            style={{ borderRadius: "70%", width: "70%", height: "70%" }}
          />
        </div>
        <div className="w-1/2 pl-4">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="fullName"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formValues.fullName || ""}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  readOnly
                />
              </div>
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
                  value={
                    formValues.businessName || userData?.businessName || ""
                  }
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
              <div className="w-full md:w-1/2 px-3  ">
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
                  value={formValues.gstin || ""}
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
              <div className="w-full md:w-1/2 px-3  ">
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
                  value={formValues.phoneNo || ""}
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  placeholder="+91"
                />
              </div>
              <div className="w-full md:w-1/2 px-3  ">
                <label
                  htmlFor="email"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="xyz@gmail.com"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 ">
                {/* Other input fields */}
                <label
                  htmlFor="state"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  State*
                </label>
                <select
                  id="state"
                  name="state"
                  value={formValues.state || ""}
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
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
                  value={formValues.businessAddress || ""}
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                  type="number"
                  id="pincode"
                  name="pincode"
                  value={formValues?.pincode || ""}
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
              <div className="w-full  px-3 mb-2">
                <label
                  htmlFor="businessDetails"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Business Details*
                </label>
                <textarea
                  id="businessDetails"
                  name="businessDetails"
                  value={user?.user?.desc || formValues.businessDetails}
                  onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  rows="5"
                ></textarea>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
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

export default EditProfile;
