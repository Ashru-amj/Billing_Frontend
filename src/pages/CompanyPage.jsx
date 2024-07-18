import React from "react";

import image from "../assets/Logo.png";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

import iotImage from "../assets/iot.jpg";

const CompanyPage = () => {
  return (
    <div className=" px-0 w-full">
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <img src={image} alt="Company Logo" className="h-16 w-20 rounded" />
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#about" className="hover:underline text-yellow-400">
                  About Us
                </a>
              </li>
             
              <li>
                <a href="#contact" className="hover:underline text-yellow-400">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section
        className="bg-cover bg-center h-96"
        style={{
          backgroundImage: `url(${iotImage})`,
        }}
      >
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl font-bold mb-4">Welcome to Spherecode</h1>
            <p className="text-xl">Innovating the future, today.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Our Mission & Vision</h2>
          <p className="mb-4 text-lg">
            Our mission is to develop great products that solve real-world
            problems and enhance the lives of our users. We strive to push the
            boundaries of technology and innovation, ensuring that our solutions
            are always at the forefront of the industry.
          </p>
          <p className="mb-4 text-lg">
            Our vision is to be the leading company in our industry, known for
            innovation, quality, and customer satisfaction. We aim to create a
            future where technology seamlessly integrates into everyday life,
            making it better, easier, and more enjoyable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-lg">
                We prioritize innovation in all our projects, ensuring that we
                are always bringing new and exciting solutions to the market.
                Our R&D team is constantly exploring new technologies and
                methodologies to improve our products and services.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Quality</h3>
              <p className="text-lg">
                Quality is at the core of everything we do. We adhere to the
                highest standards in the industry, ensuring that every product
                we develop meets rigorous quality checks and exceeds customer
                expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="p-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">About Us</h2>
          <p className="text-lg mb-4">
            SPHERECODE team have been experienced in providing business
            technology solutions for 5+ years to a wide variety of industries,
            helping companies achieve their goals, streamline.bringing together
            the right people and organizations to build a leading provider of
            business technology solution .
          </p>
          <p className="text-lg">
            Founded in 2022, we have achieved numerous milestones
          </p>
        </div>
      </section>

      {/* Products */}
      {/* <section id="products" className="bg-gray-100 p-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-bold mb-2">Product 1</h3>
              <p>A groundbreaking product that revolutionizes the way you do X.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-bold mb-2">Product 2</h3>
              <p>An innovative solution designed to improve Y.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-bold mb-2">Product 3</h3>
              <p>A state-of-the-art tool that enhances Z.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact */}
      <section id="contact" className="p-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Contact Us</h2>
          <p className="text-lg text-center mb-6">
            Address: Registered Office Plot No-150 (GA), Niladri Vihar,
            Chandrasekharpur, Bhubaneswar, Odisha-21
          </p>
          <p className="text-lg text-center mb-6">Phone: 9883926064</p>
          <p className="text-lg text-center mb-6">Email: info@spherecode.in </p>
          <form className="max-w-lg mx-auto mt-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 border border-gray-300 rounded mb-4 w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 border border-gray-300 rounded mb-4 w-full"
            />
            <textarea
              placeholder="Your Message"
              className="p-3 border border-gray-300 rounded mb-4 w-full"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 SphereCode. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:underline">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:underline">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:underline">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompanyPage;
