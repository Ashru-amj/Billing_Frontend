import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction } from "../store/transactionSlice";
import { Link } from "react-router-dom";

const AddPurchaseOrder = () => {
  const transctionData = useSelector((state) => state.transaction).transaction;
  const dispatch = useDispatch();

  const [numberData, setNumberData] = useState(
    Number(transctionData[transctionData.length - 1]?.number) + 1 || 1
  );
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [purchaseOrders, setPurchaseOrders] = useState(transctionData);
  const [searchQuery, setSearchQuery] = useState("");


  // State for form fields
  const [party, setParty] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [type, setType] = useState("Cash");
  const [status, setStatus] = useState("Paid");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const formData = {
      party,
      number: numberData,
      date:new Date().toLocaleDateString(),
      dueDate,
      totalAmount,
      balance,
      type,
      status,
    };

    dispatch(addTransaction(formData));

    setPurchaseOrders([...purchaseOrders, formData]);
    // Reset form fields
    setParty("");
     
    setDueDate("");
    setTotalAmount("");
    setBalance("");
    setType("Cash");
    setStatus("Paid");
    setNumberData(numberData + 1);

    setPopupOpen(false);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filteredOrders = transctionData.filter((order) =>
      order.party.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPurchaseOrders(filteredOrders);
  }, [searchQuery, transctionData]);




  return (
    <div className=" w-full  p-4">
      <div className="flex w-full justify-between items-center py-3">
        <div className="flex items-center">
          <p className="mr-2 text-2xl">All Purchase Transactions</p>
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
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
            onClick={() => setPopupOpen(true)}
          >
            <FaPlus className="mr-2" />
            Add Transaction
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={"/create-purchase"}
            className=" bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            Create Purchase
          </Link>
        </div>
      </div>
      <div className="flex w-full justify-center items-center py-3">
        {isPopupOpen && (
          <div className="flex  w-full h-full bg-gray-800 bg-opacity-50  justify-between items-center">
            <div className="bg-white w-full">
              {/* Form fields */}
              <form
                onSubmit={handleSubmit}
                className="flex w-full justify-between gap-2 mt-8"
              >
                <div className="mb-4 ">
                  <label htmlFor="party" className="block mb-2">
                    Party Name:
                  </label>
                  <input
                    type="text"
                    id="party"
                    className="w-full px-4 py-2 border rounded-md"
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="block mb-2">
                   Purchase Date:
                  </label>
                  {/* <input
                    type="date"
                    id="date"
                    className="w-full px-4 py-2 border rounded-md"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  /> */}
                  <p className="w-full px-4 py-2  border rounded-md mr-0">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="mb-4 ">
                  <label htmlFor="dueDate" className="block mb-2">
                    Due Date:
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    className="w-full px-4 py-2 border rounded-md"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 ">
                  <label htmlFor="totalAmount" className="block mb-2">
                    Total Amount:
                  </label>
                  <input
                    type="number"
                    id="totalAmount"
                    className="w-full px-4 py-2 border rounded-md"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 ">
                  <label htmlFor="balance" className="block mb-2">
                    Balance:
                  </label>
                  <input
                    type="number"
                    id="balance"
                    className="w-full px-4 py-2 border rounded-md"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="type" className="block mb-2">
                    Type:
                  </label>
                  <select
                    id="type"
                    className="w-full mx-4 py-2 border rounded-md"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
                <div className="mb-4 ">
                  <label htmlFor="status" className="block mb-2">
                    Status:
                  </label>
                  <select
                    id="status"
                    className="w-full mx-4 py-2 border rounded-md"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                 

                <div className="mx-4">
                  <div className="my-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 block items-center  rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Submit
                    </button>
                  </div>
                  <button
                    className="bg-gray-300 text-gray-700 block items-center mb-2  px-4 rounded-md"
                    onClick={() => setPopupOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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
              <th className="border px-4 py-2">Due Date</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Balance</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {purchaseOrders.map((order, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>

                <td className="border px-4 py-2">{order.party}</td>
                <td className="border px-4 py-2">{order.number}</td>
                <td className="border px-4 py-2">{order.date}</td>
                <td className="border px-4 py-2">{order.dueDate}</td>
                <td className="border px-4 py-2">
                  {Number(order.totalAmount).toFixed()}
                </td>
                <td className="border px-4 py-2">
                  {Number(order.balance).toFixed()}
                </td>
                <td className="border px-4 py-2">{order.type}</td>
                <td className="border px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddPurchaseOrder;
