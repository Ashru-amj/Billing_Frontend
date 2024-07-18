import React from "react";

import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function StartPage() {
  return (
    <div className="w-full h-full ">
      <NavBar />
      <div
        className={
          "w-full h-90 px-0 md:px-4 justify-center items-center flex   "
        }
      >
        <div
          className="w-full h-full flex flex-col items-center justify-center 
       md:gap-6 px-4"
        >
          <div className="w-full  flex flex-col pt-20   items-center justify-center gap-y-10 ">
            
            <h1
              className={
                "text-4xl 2xl:text-6xl font-bold text-center text-gray-700"
              }
            >
              Join Our Sphere code Billing app
            </h1>
            <span
              className={"text-base md:text-[18px] text-center  text-slate-900"}
            >
              Sphere Code, a leading provider of innovative software solutions,
              introduces its cutting-edge billing app designed to revolutionize
              the way businesses manage their invoicing processes.
              <p>
                With Sphere Code's billing app, businesses can streamline their
                billing operations with ease and efficiency. The app offers a
                user-friendly interface that makes it simple for users to
                create, send, and track invoices from anywhere, at any time.
                Whether you're a freelancer, small business owner, or
                enterprise, Sphere Code's billing app caters to your invoicing
                needs with its customizable features and robust functionality.
              </p>
            </span>
            <div className="flex gap-6 items-center mt-6 ">
              <button className={"text-white  flex rounded h-10 text-sm"}>
                <Link
                  className="text-2xl rounded-full border px-6 p-1 bg-blue-950"
                  to="/auth/login"
                >
                  Get Started
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
