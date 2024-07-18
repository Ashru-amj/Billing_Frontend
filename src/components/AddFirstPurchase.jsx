import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs"; // Importing the shopping cart icon from React Icons
import { Link } from "react-router-dom";

const AddFirstPurchase = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleInstructionsToggle = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white-100">
      <button
        onClick={handleInstructionsToggle}
        className="absolute top-4 right-4 bg-gray-300 text-black px-4 my-16 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
      >
        Instructions
      </button>
      {showInstructions && (
        <div className="absolute top-16 right-4 bg-white border border-gray-300 rounded-md p-4 shadow-lg z-50">
          <h2 className="text-lg font-bold mb-2 py-2 my-16">
            Inventory Items Instructions
          </h2>
          <ol className="list-decimal list-inside">
            <li>Click on the items page </li>
            <li>Enter item name, quantity, and price.</li>
            <li>click on the add item.</li>
            <li>
              If you want to search items you can search by the item name.
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
        Make Estimate/ Quotation/ Proform Invoice and share with your parties by
        Printed copies you can convert them to sale Invoice later by just click
        of a button.
      </p>
      <Link
        to="/create-estimate"
        className=" bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
      >
        {" "}
        Add your first Estimate
      </Link>
    </div>
  );
};

export default AddFirstPurchase;
