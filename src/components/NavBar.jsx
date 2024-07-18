import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import useStore from "../store";
import Button from "./Button";
import Logo from "./Logo";

function getInitials(fullName) {
  const names = fullName.split(" ");

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials.join("");

  return initialsStr;
}
const MobileMenu = ({ user, signOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex bg-blue-800 text-white  ">
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-fit bg-white dark:bg-[#020b19] z-50 flex flex-col py-10 items-center justify-center shadow-xl gap-4">
          <Logo />
          <ul className="flex flex-col gap-2 text-base text-black dark:text-gray-300">
            <li onClick={toggleMenu}>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isActive ? "active px-3 rounded" : isPending ? "pending" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li onClick={toggleMenu}>
              <NavLink
                to="/explore-odisha"
                className={({ isActive, isPending }) =>
                  isActive ? "active px-3 rounded" : isPending ? "pending" : ""
                }
              >
                Explore odisha
              </NavLink>
            </li>
            <li onClick={toggleMenu}>
              <NavLink
                to="/contact-us"
                className={({ isActive, isPending }) =>
                  isActive ? "active px-3 rounded" : isPending ? "pending" : ""
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="flex gap-2 items-center">
            {user?.token ? (
              <div className="w-full flex  flex-col items-center justify-center ">
                <div className="flex gap-1 items-center mb-5">
                  {user?.user.image ? (
                    <img
                      src={user?.user.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="text-white w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      {getInitials(user?.user.name)}
                    </span>
                  )}
                  <span className="font-medium text-black dark:text-gray-500">
                    {user?.user.name}
                  </span>
                </div>

                <button
                  className="bg-black dark:bg-rose-600 text-white dark:text-white px-8 py-1.5 rounded-full text-center outline-none"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth/login">
                <Button
                  label="Login"
                  styles="flex  bg-black dark:bg-rose-600 text-white dark:text-white text-white px-4 py-2 rounded-full"
                />
              </Link>
            )}
          </div>

          <span
            className="cursor-pointer text-xl font-semibold dark:text-white"
            onClick={toggleMenu}
          >
            <AiOutlineClose />
          </span>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { user, signOut } = useStore();
  const [showProfile, setShowProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggoleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userInfo");
    signOut();
  };

  return (
    <div>
      <nav className="flex  md:flex-row w-full py-2 lg:pl-6 2xl:px-8 bg-blue-800  items-center justify-between gap-4 md:gap-0">
        <Logo />
        <div className="flex gap-10 items-start  px-6  ">
          <ul className="flex pl-4 gap-8 text-base  text-white dark:text-white">
            <NavLink
              to="/company"
              className={({ isActive, isPending }) =>
                isActive ? "active px-3 rounded" : isPending ? "pending" : ""
              }
            >
              Company
            </NavLink>
            <NavLink
              to="/help"
              className={({ isActive, isPending }) =>
                isActive ? "active px-3 rounded" : isPending ? "pending" : ""
              }
            >
              help
            </NavLink>
            <NavLink>Customer Support: (+91)1234567890</NavLink>
          </ul>
        </div>
        
      </nav>
    </div>
  );
};
export default Navbar;
