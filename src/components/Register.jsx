import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import axios from "axios";
import { APP_URL, reg, uploadFile, validateName, validatePassword } from "../utils";
import useStore from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
const SignUp = () => {
  const userData = useSelector((state) => state.user).user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validateError, setValidateError] = useState([]);
  const [validateNameE, setValidateName] = useState("");

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [fileURL, setFileUrl] = useState("");
  const [err, setErr] = useState("");
  const [responseErr, setResponseErr] = useState({});

  useEffect(() => {
    file && uploadFile(setFileUrl, file);
  }, [file]);
  useEffect(() => {
    if (password !== confirmPassword) {
      setErr("Password and Conform Password are not matched");
      return;
    } else {
      setErr("");
    }
  }, [confirmPassword]);

  useEffect(() => {
    const err = validatePassword(password);
    const nameErr = validateName(name);
    if (!nameErr) {
      setValidateName("Please provide atleast 3 letter");
    }
    else{
      setValidateName("");
    }
    setValidateError(err);
  }, [password, name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!reg.test(email)){
      alert("Please provide a valid email.");
      return
    }

    const url = `${APP_URL}/user/register`;

    try {
      setTimeout(async () => {
        const response = await axios.post(url, {
          fullName: name,
          email,
          password,
          profileUrl: fileURL,
        });
        setFile(null);
        if (response.data.success) {
          alert(response.data.message);
          dispatch(setUser(response.data));

          setTimeout(() => {
            navigate("/dashboard");
          }, 100);
        } else {
          setResponseErr(response.data.message);
          alert(response.data.message);
        }
      }, 1000);
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <div className="flex items-center justify-center my-6">
          <Logo />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Sign Up
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your Full Name"
              required
            />
          {validateNameE && (
            <ul>
              <li style={{ color: "red", fontSize: "10px " }}>{validateNameE}</li>
            </ul>
          )}
          </div>
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <ul>
            {validateError &&
              validateError.map((error, index) => (
                <li key={index} style={{ color: "red", fontSize: "10px " }}>
                  {error}
                </li>
              ))}
          </ul>

          <div className="mb-4 mt-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Conform your password"
              required
            />
            {err && <p className="  text-red-700">{err}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Business Logo <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
