import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addSales } from "../store/saleSlice";
import { Link } from "react-router-dom";
import DataDropDown from "../components/DataDropDown";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(quarterOfYear);

const SalesTransaction = () => {
  const salesData = useSelector((state) => state.sales).sales;
  const dispatch = useDispatch();
  const [numberData, setNumberData] = useState(
    Number(salesData[salesData.length - 1]?.number) + 1 || 1
  );
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [purchaseOrders, setPurchaseOrders] = useState(salesData);
  const [searchQuery, setSearchQuery] = useState("");

  const [isOpen, setOpen] = useState(false);

  // State for form fields
  const [party, setParty] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [balance, setBalance] = useState("");
  // const [type, setType] = useState("Sale");
  const [status, setStatus] = useState("Paid");
  const [paymentType, setPaymentType] = useState("Cash");
  const [dateRange, setDateRange] = useState("");

  // Function to handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      party,
      number: numberData,
      date: new Date().toLocaleDateString(),
      dueDate,
      totalAmount,
      balance,
      type: paymentType,
      status,
    };

    dispatch(addSales(formData));

    setPurchaseOrders([...purchaseOrders, formData]);

    setParty("");

    setDate("");
    setDueDate("");
    setTotalAmount("");
    setBalance("");
    setPaymentType("Cash");
    setStatus("Paid");
    setNumberData(numberData + 1);

    setPopupOpen(false);
  };

  useEffect(() => {
    const filteredOrders = salesData.filter((order) =>
      order.party.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPurchaseOrders(filteredOrders);
  }, [searchQuery, salesData]);

  useEffect(() => {
    const filterByDateRange = () => {
      const now = dayjs();
      let filteredOrders = salesData;
      switch (dateRange) {
        case "today":
          filteredOrders = salesData.filter((order) =>
            dayjs(order.date).isSame(now, "day")
          );
          console.log(filteredOrders);

          break;
        case "this_week":
          filteredOrders = salesData.filter((order) =>
            dayjs(order.date).isSame(now, "week")
          );
          console.log(filteredOrders);

          break;
        case "this_month":
          filteredOrders = salesData.filter((order) =>
            dayjs(order.date).isSame(now, "month")
          );
          console.log(filteredOrders);

          break;
        case "quarterly":
          const startOfQuarter = now.startOf("quarter");
          const endOfQuarter = now.endOf("quarter");
          filteredOrders = salesData.filter(
            (order) =>
              dayjs(order.date).isAfter(startOfQuarter) &&
              dayjs(order.date).isBefore(endOfQuarter)
          );
          console.log(filteredOrders);

          break;
        case "halfyearly":
          filteredOrders = salesData.filter(
            (order) => now.diff(dayjs(order.date), "month") < 6
          );
          console.log(filteredOrders);

          break;
        case "this_year":
          filteredOrders = salesData.filter((order) =>
            dayjs(order.date).isSame(now, "year")
          );
          console.log(filteredOrders);

          break;
        default:
          filteredOrders = salesData;
          break;
      }

      setPurchaseOrders(filteredOrders);
    };

    filterByDateRange();
  }, [dateRange, salesData]);

  return (
    <div className=" w-full  p-4">
      <p className="mr-2 text-3xl">All Sales Transactions</p>

      <div className="flex w-full justify-between items-center py-3 gap-2">
        {/* <div className="flex items-center">
        </div> */}
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
            Add Sales Transaction
          </button>
        </div>
        <div className="flex items-center space-x-4  ">
          <DataDropDown onDateRangeChange={setDateRange} />
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to={"/create-sales"}
            className=" bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            Create Sales
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
                    Party:
                  </label>
                  <input
                    type="text"
                    id="party"
                    className="w-full px-4 py-1 border rounded-md"
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="flex mb-2">
                    Order Date:
                  </label>
                  <p className="w-full px-4  border rounded-md mr-0">
                    {new Date().toLocaleDateString()}
                  </p>
                  {/* 
                  <input
                    type="date"
                    id="date"
                    className="w-full px-4 py-2 border rounded-md"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  /> */}
                </div>
                <div className="mb-4 ">
                  <label htmlFor="dueDate" className="block mb-2">
                    Due Date:
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    className="w-full px-4 py-1 border rounded-md"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div className="mb-4 ">
                  <label htmlFor="totalAmount" className="block mb-2">
                    Total Amount:
                  </label>
                  <input
                    type="number"
                    id="totalAmount"
                    className="w-full px-4 py-1 border rounded-md"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                  />
                </div>
                <div className="mb-4 ">
                  <label htmlFor="balance" className="block mb-2">
                    Balance:
                  </label>
                  <input
                    type="number"
                    id="balance"
                    className="w-full px-4 py-1 border rounded-md"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="type" className="block mb-2">
                    Type:
                  </label>
                  <select
                    id="type"
                    className="w-full mx-4 py-1 border rounded-md"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
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
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                {/* <div className="mb-4 mx-4">
                  <label htmlFor="action" className="block mb-2">
                    Action:
                  </label>
                  <input
                    type="text"
                    id="action"
                    className="w-full px-4 py-2 border rounded-md"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                  />
                </div> */}

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
        {/* Table to display purchase orders */}
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Sl No</th>
              <th className="border px-4 py-2">Party</th>
              <th className="border px-4 py-2">Number</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Due Date</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Balance</th>
              <th className="border px-4 py-2">Payment Mode</th>
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

export default SalesTransaction;
