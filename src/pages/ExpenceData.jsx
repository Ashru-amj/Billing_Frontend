import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ExpenceData = () => {
  const allExpences = useSelector((state) => state.expence).expence;

  const [expenceOrders, setExpenceOrders] = useState(allExpences);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredOrders = allExpences.filter((order) =>
      order?.party.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setExpenceOrders(filteredOrders);
  }, [searchQuery, allExpences]);

  return (
    <div className=" w-full  p-4">
      <div className="flex w-full justify-between items-center py-3">
        <div className="flex items-center">
          <p className="mr-2 text-2xl">All Expences </p>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 border rounded-md mr-2 focus:outline-none"
          />
          <FaSearch className="text-gray-700" />{" "}
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to={"/create-expence"}
            className=" bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            Create Expence
          </Link>
        </div>
      </div>

      <hr />
      <div className="flex items-center w-full justify-center p-4">
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Sl No.</th>
              <th className="border px-4 py-2">Party</th>
              <th className="border px-4 py-2">Number</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Party Category</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Total Quantity</th>
            </tr>
          </thead>

          <tbody>
            {expenceOrders.map((order, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>

                <td className="border px-4 py-2">{order.party}</td>
                <td className="border px-4 py-2">{order.number}</td>
                <td className="border px-4 py-2">{order.date}</td>
                <td className="border px-4 py-2">{order.purchaseCat}</td>

                <td className="border px-4 py-2">
                  {order?.totalAmount.toFixed()}
                </td>

                <td className="border px-4 py-2">{order.toatalquantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenceData;
