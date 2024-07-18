import React, { useState } from 'react';
import { BsCart4 } from "react-icons/bs"; // Importing the shopping cart icon from React Icons
import { Link } from 'react-router-dom';

const AddFirstOrder = () => {
  const [showInstructions, setShowInstructions] = useState(false);


  const handleInstructionsToggle = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white-100">
         <button
        onClick={handleInstructionsToggle}
        className="absolute top-4 right-4 bg-gray-300 text-black px-4 py-2 my-16 rounded-md hover:bg-gray-400 focus:outline-none"
      >
        Instructions
      </button>

      {showInstructions && (
        <div className="absolute top-16 right-4 bg-white border border-gray-300 rounded-md p-4 shadow-lg z-50">
          <h2 className="text-lg font-bold mb-2">
            Purchase Order Instructions
          </h2>
          <ol className="list-decimal list-inside">
            <li>To add a "Estimate" for your requirement,</li>
            <li>First, click on "Add your first estimate."</li>
            <li>
              Next, fill out the form as required. Then click "Save." All the
              information will be saved.
            </li>
            <li>
              To view the PDF format and share the PDF information, click on "Go
              to Create Bills."
            </li>
            <li>
              When you click on "View Sales," all the sales history will be
              displayed.
            </li>
          </ol>
          <button
            onClick={handleInstructionsToggle}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Close
          </button>
        </div>
      )}

      <BsCart4 size={100} className="text-blue-900 mb-4" /> 
      <p className="text-center mb-8">
        Make and Share  Purchase Order with your Parties and converts them to purchase bill instantly.
      </p>
      <Link to="/create-purchase" className =" bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"> Add your first Purchase</Link>
      
    </div>
  );
};

export default AddFirstOrder;
