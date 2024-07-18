import axios from "axios";
import React, { useState } from "react";

import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import HelpDesk from "../components/HelpDesk";
import { APP_URL } from "../utils";

const HelpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSocialMediaClick = (url) => {
    window.open(url, "_blank");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO feedback form
    
    const url = `${APP_URL}/utils/help`;
    try {
      const response = await axios.post(url, {
        fullName: name,
        email,
        message,
      });
      alert("Question submitted successfully!");
      console.log(response.data);
      setName("")
      setEmail("")
      setMessage("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert(
        "An error occurred while submitting feedback. Please try again later."
      );
    }
  };

  return (
    <div className=" w-full bg-gray-100 flex  justify-center  items-center">
      <div className=" w-full items-center bg-white shadow-lg rounded-lg">
        <div className=" p-4 m-4 w-full">
          <h1 className="text-3xl font-semibold mb-4">Need Help?</h1>
          <p className="text-lg text-gray-700 mb-8">
            Welcome to our help page. If you have any questions or need
            assistance, feel free to contact us.
          </p>

          <div className="border-t border-gray-300 pt-6">
            <h2 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-4">
                  Q
                </div>
                <div>
                  <h3 className="font-semibold">
                    What are your business hours?
                  </h3>
                  <p className="text-gray-700">
                    Our business hours are Monday to Friday, 9:00 AM to 5:00 PM.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-4">
                  Q
                </div>
                <div>
                  <h3 className="font-semibold">How can I contact support?</h3>
                  <p className="text-gray-700">
                    You can contact our support team via email at
                    support@example.com.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-4">
                  Q
                </div>
                <div>
                  <h3 className="font-semibold">Do you offer refunds?</h3>
                  <p className="text-gray-700">
                    Yes, we offer refunds within 30 days of purchase. Please see
                    our refund policy for more details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="block p-4 m-4 w-full">
          <HelpDesk/>
        </div>
        <div className="block p-4 m-4 w-full">
          <form
            className="flex flex-col items-center mb-8 pt-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              placeholder="Your Name"
              className="w-full max-w-md border border-blue-300 rounded-lg px-4 py-2 mb-4"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              placeholder="Your Email"
              className="w-full max-w-md border border-blue-300 rounded-lg px-4 py-2 mb-4"
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e)=>{setMessage(e.target.value)}}
              className="w-full max-w-md border border-blue-300 rounded-lg px-4 py-2 mb-4 h-32"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </form>
        </div>
        <div className="flex flex-wrap justify-center mb-4">
          <button
            onClick={() => handleSocialMediaClick("https://www.facebook.com")}
          >
            <FaFacebook className="text-4xl text-blue-600 mr-4" />
          </button>
          <button
            onClick={() => handleSocialMediaClick("https://www.linkedin.com")}
          >
            <FaLinkedin className="text-4xl text-blue-600 mr-4" />
          </button>
          <button onClick={() => handleSocialMediaClick("https://twitter.com")}>
            <FaTwitter className="text-4xl text-blue-600 mr-4" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default HelpPage;