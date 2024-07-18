import { useState } from "react";
import useStore from "../store";
import axios from "axios";
import { APP_URL } from "../utils";

const Contact = () => {
  const { user } = useStore();
  const [name, setName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.user.email);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO feedback form
    
    const url = `${APP_URL}/utils/feedback`;
    try {
      const response =await axios.post(url, { fullName: name, userId:user?.user._id, email, message },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      alert("Feedback submitted successfully!");
      console.log(response.data)
      // Optionally, you can clear the form fields after submission
      setMessage("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert(
        "An error occurred while submitting feedback. Please try again later."
      );
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="relative flex flex-col justify-center  overflow-hidden">
          <div className="w-full px-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-2xl font-semibold text-center text-gray-700">
              Feedback form
            </h1>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
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
                  placeholder="Enter your Name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
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
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  rows="4"
                  cols="50"
                  type="email"
                  id="message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  name="message"
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Feed back"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
