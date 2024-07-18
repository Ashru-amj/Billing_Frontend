import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem } from "../store/estimateSlice";

const ViewEstimate = () => {
  const estimateData = useSelector((state) => state.estimate).estimate;
  const dispatch = useDispatch();
  const [estimateOrder, setEstimateOrder] = useState(estimateData);

  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (index) => {
    dispatch(removeItem(index));
  };

  // useEffect(() => {
  //   const filteredOrders = estimateData.filter((order) =>
  //     order.party.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  //   setEstimateOrder(filteredOrders);
  // }, [searchQuery, handleDelete]);

  return (
    <div className=" w-full  p-4">
      <div className="flex w-full justify-between items-center py-3">
        <div className="flex items-center">
          <p className="mr-2 text-2xl">All Estimate Data</p>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 border rounded-md mr-2 focus:outline-none"
          />
          <FaSearch className="text-gray-700" />
        </div>
        <div></div>
        <div className="flex items-center justify-end pb-4">
          <Link
            to={"/create-estimate"}
            className="  py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Create Estimate
          </Link>
        </div>
      </div>

      <hr />
      <div className="flex items-center w-full justify-center p-4">
        {/* Table to display purchase orders */}
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">SL No.</th>
              <th className="border px-4 py-2">Party</th>
              <th className="border px-4 py-2">Number</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Total Quantity</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>

          <tbody>
            {/* {party: "Debasis Bhuyan", number: 1, date: "2024-05-03", toatalquantity: 45, totalAmount: 122130000,…} */}

            {estimateOrder.map((order, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>

                <td className="border px-4 py-2">{order.party}</td>
                <td className="border px-4 py-2">{order.number}</td>
                <td className="border px-4 py-2">{order.date}</td>
                <td className="border px-4 py-2">
                  {" "}
                  {order.totalAmount.toFixed()}{" "}
                </td>
                <td className="border px-4 py-2">{order.toatalquantity}</td>
                <td className="border px-4 py-2">{order.type}</td>

                <td className="border px-4 py-2">
                  <button onClick={() => handleDelete(index)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewEstimate;
