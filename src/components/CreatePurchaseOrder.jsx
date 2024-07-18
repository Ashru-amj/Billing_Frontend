import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPurchase, clearPurchase, removeItem } from "../store/purchaseSlice";
import { MdDelete } from "react-icons/md";
import { addTransaction } from "../store/transactionSlice";
import { Link } from "react-router-dom";

const CreatePurchaseOrder = () => {
  const purchaseData = useSelector((state) => state.purchase).purchase;
  const transctionData = useSelector((state) => state.transaction).transaction;
  const dispatch = useDispatch();
  const [purchaseOrders, setPurchaseOrders] = useState(purchaseData);
  const [orderDate, setOrderDate] = useState("");
  const [orderNo, setOrderNo] = useState(
    Number(transctionData[transctionData.length - 1]?.number) + 1 ||1
  );
  const [addRow, setAddRow] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [paymentType, setPaymentType] = useState("Cash");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [phoneNo, setPhoneNo] = useState("");
  const [partyData, setPartyData] = useState({});

  // State for form fields

  const [partyName, setPartyName] = useState("");

  const [totalAmount, setTotalAmount] = useState(0);
  const [toatalquantity, setTotalQuantity] = useState(0);
  const [round, setRound] = useState(false);

  // add Item code
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    item: "",
    qty: "",
    unit: "",
    pricePerUnit: "",
    tax: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const optionValue = formData.tax;
    const taxData = optionValue.match(/\d+/)[0];
    const newItem = {
      ...formData,
      amount:
        Number(formData.qty) * formData.pricePerUnit +
        (Number(formData.qty) * formData.pricePerUnit * Number(taxData)) / 100,
    };
    setItems([...purchaseOrders, newItem]);
    setPurchaseOrders([...purchaseOrders, newItem]);
    dispatch(addPurchase(newItem));
    setFormData({
      item: "",
      qty: "",
      unit: "",
      pricePerUnit: "",
      tax: "",
    });
  };
  const taxData = [28, 18, 12, 16];
  const unitData = [
    "Numbers (n)",
    "Centimeters (cm)",
    "Meters (m)",
    "Kilometers (km)",
    "Inches (in)",
    " Grams (g)",
    "Kilograms (kg)",
    "Tonnes (t)",
    "Pounds (lb)",
    " Milliliters (ml)",
    "Liters (l) ",
  ];
  const paymentMode = ["Cash", "UPI", "Card"];
  useEffect(() => {
    let total = 0;
    let toatalQty = 0;
    purchaseOrders.forEach((item) => {
      total += item.amount;
      toatalQty += Number(item.qty);
    });
    setTotalQuantity(toatalQty);
    setTotalAmount(total);
  }, [items]);

  const handleDelete = (index) => {
    dispatch(removeItem(index));
  };

  useEffect(() => {
    setPurchaseOrders(purchaseData);
  }, [handleDelete]);

  const handleTransaction = (e) => {
    e.preventDefault();
    const obj = {
      party: partyName,
      number: orderNo,
      date: orderDate || new Date().toLocaleDateString(),
      dueDate: dueDate || new Date().toLocaleDateString(),
      totalAmount: totalAmount,
      balance: totalAmount,
      type: paymentType,
      status: paymentStatus,
    };
    dispatch(addTransaction(obj));
    alert("successfully updated");
  };

  useEffect(() => {
    setPurchaseOrders(purchaseData);
  }, [handleTransaction]);

  const handleClear = () => {
    dispatch(clearPurchase());
    setTotalAmount(0);
    setTotalQuantity(0);

    setPartyName("");

    setDueDate("");
    // setBalance(0);
    setPaymentType("Cash");
    setPaymentStatus("Paid");
    setOrderNo(Number(transctionData[transctionData.length - 1]?.number) + 1 || 1);
    setPhoneNo("");
  };

  useEffect(() => {
    const obj = {
      party: partyName,
      number: orderNo,
      date: new Date().toLocaleDateString(),
      dueDate,
      totalAmount: totalAmount,
      balance: totalAmount,
      type: paymentType,
      status: paymentStatus,
      toatalquantity,
    };
    setPartyData(obj);
  }, [
    partyName,
    orderNo,
    orderDate,
    dueDate,
    totalAmount,
    paymentStatus,
    paymentType,
  ]);

  return (
    <div className="w-full p-2">
      
      <h2 className=" text-3xl pb-3">Purchase Order</h2>
      <hr />
      <div className=" w-full  p-4">
        <form onSubmit={handleTransaction}>
          <div className="flex justify-end items-center gap-4">
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="w-20 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Save
              </button>
            </div>
            <div className="flex items-center justify-end">
              <Link
                to={"/purchase"}
                className="  py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                view Purchase
              </Link>
            </div>
          </div>
          <div className="flex w-full justify-between items-center py-3">
            <div className=" w-full">
              <div className=" w-full flex  items-center  justify-between">
                <label htmlFor="type" className=" w-2/3 flex  ">
                  Party Name:
                  <input
                    type="text"
                    id="setPartyName"
                    name="setPartyName"
                    required
                    className="w-full px-4 py-2 border-2 rounded-md"
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                    placeholder="Enter Party Name"
                  />
                </label>
              </div>
              <div className="  flex py-1 items-center  justify-between">
                <label htmlFor="phoneNo" className=" w-2/3 flex  ">
                  Phone No:
                  <input
                    type="number"
                    id="phoneNo"
                    name="phoneNo"
                    className="w-full px-4 py-2 border-2 rounded-md"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    placeholder="Enter phone No. "
                    minLength="10"
                  />
                </label>
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-center justify-center">
              <div className="mb-2  w-full items-center flex justify-center">
                <label htmlFor="number1" className="1/3 mb-2 px-2 mr-3">
                  Order No:
                </label>
                <p className="w-2/3 px-4  border rounded-md mr-0">{orderNo}</p>
              </div>
              <div className="mb-2  w-full flex justify-center">
                <label htmlFor="number" className="inline-block 1/3   mr-4">
                  Order Date:
                </label>
                <input
                  type="Date"
                  id="number"
                  className="w-2/3 px-4  border rounded-md"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2  w-full flex justify-center">
                <label htmlFor="number" className="inline-block 1/3   mr-7">
                  Due Date:
                </label>
                <input
                  type="Date"
                  id="number"
                  className="w-2/3 px-4  border rounded-md"
                  value={dueDate}
                  required
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
        <hr />
        <div className="flex items-center w-full justify-center p-4">
          <div className="w-full mx-auto">
            <div className="flex items-center justify-end">
              <button
                onClick={handleClear}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 py-2 px-4 rounded"
              >
                Clear
              </button>
            </div>
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Sl No.</th>
                  <th className="border border-gray-200 px-4 py-2">Item</th>
                  <th className="border border-gray-200 px-4 py-2">Qty</th>
                  <th className="border border-gray-200 px-4 py-2">Unit</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Price/Unit (without GST)
                  </th>
                  <th className="border border-gray-200 px-4 py-2">GST</th>
                  <th className="border border-gray-200 px-4 py-2">Amount</th>
                  <th className="border border-gray-200 px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.item}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.qty}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.unit}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.pricePerUnit}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.tax}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {Number(item.amount).toFixed(2)}
                    </td>
                    <td className="border justify-center border-gray-200 px-4 py-2">
                      <button onClick={() => handleDelete(index)}>
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="2"
                    className="border border-gray-200 px-4 py-2 text-right"
                  >
                    Total quantity:
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {toatalquantity}
                  </td>
                  <td
                    colSpan="3"
                    className="border border-gray-200 px-4 py-2 text-right"
                  >
                    Total Amount:
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
            {!addRow && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 py-2 px-4 rounded"
                onClick={(e) => {
                  setAddRow(!addRow);
                }}
                value={addRow}
              >
                Add row
              </button>
            )}

            <div className="flex w-full justify-center items-center py-">
              {addRow && (
                <div className="flex  w-full h-full  justify-between items-center">
                  <div className=" w-full flex">
                    {/* Form fields */}
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="item"
                        value={formData.item}
                        onChange={handleChange}
                        placeholder="Item"
                        className=" border  m-3  px-4 text-black rounded"
                        required
                      />
                      <input
                        type="number"
                        name="qty"
                        value={formData.qty}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className=" border  m-3  px-4 text-black rounded"
                        required
                      />

                      <select
                        id="unit"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="border  m-3  px-4 text-black rounded"
                        required
                      >
                        <option value="">Select Unit</option>
                        {unitData.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        name="pricePerUnit"
                        value={formData.pricePerUnit}
                        onChange={handleChange}
                        placeholder="Price Per Unit without tax"
                        className=" border  m-3  px-4 text-black rounded"
                        required
                      />
                      <select
                        id="tax"
                        name="tax"
                        value={formData.tax}
                        onChange={handleChange}
                        className="border  m-3  px-4 text-black rounded"
                        required
                      >
                        <option value="">Select GST</option>

                        <option value="GST@0%">GST@0%</option>
                        <option value="IGST@0%">IGST@0%</option>
                        <option value="GST5%">GST5%</option>
                        <option value="IGST5%">IGST5%</option>
                        <option value="GST12%">GST12%</option>
                        <option value="IGST12%">IGST12%</option>
                        <option value="GST18%">GST18%</option>
                        <option value="IGST18%">IGST18%</option>
                        <option value="GST28%">GST28%</option>
                        <option value="IGST28%">IGST28%</option>
                      </select>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 py-2 px-4 rounded"
                        type="submit"
                      >
                        Add Item
                      </button>
                      <button
                        className="bg-blue-400 hover:bg-blue-600 text-white font-bold m-3 py-2 px-4 rounded"
                        onClick={(e) => {
                          setAddRow(!addRow);
                        }}
                        value={addRow}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center gap-4 w-full justify-start p-4">
            <label htmlFor="payment" className="inline-block 1/3 mb-2 mr-4">
              Payment Mode:
            </label>
            <select
              id="payment"
              name="paymentType"
              value={paymentType}
              onChange={(e) => {
                setPaymentType(e.target.value);
              }}
              className="border  m-3  px-4 text-black rounded"
              required
            >
              {paymentMode.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4 w-full justify-start p-4">
            <label htmlFor="payment" className="inline-block 1/3 mb-2 mr-4">
              Payment Status:
            </label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              value={paymentStatus}
              onChange={(e) => {
                setPaymentStatus(e.target.value);
              }}
              className="border  m-3  px-4 text-black rounded"
            >
              <option value={"paid"}>paid</option>
              <option value={"pending"}>pending</option>
            </select>
          </div>
          <div className="flex items-end gap-4 w-full justify-center p-4">
            <div className="flex">
              <input
                type="checkbox"
                id="round"
                onChange={(e) => {
                  setRound(!round);
                }}
              />
              <label htmlFor="round" className=" mx-4 block">
                Round Off
              </label>
            </div>
            {!round ? (
              <div className=" flex">
                Total Amount:
                <span className="border mx-4 px-4 ">
                  {totalAmount.toFixed(2)}
                </span>
              </div>
            ) : (
              <div className=" flex ">
                Total Amount:
                <span className="border mx-4 px-4 ">
                  {Math.round(totalAmount)}
                </span>
              </div>
            )}
          </div>
        </div>

        <hr />
        <div className="flex justify-end items-end">
          <Link
            to={"/create-purchase-bills"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 py-2 px-4 rounded"
            state={{ purchaseOrders, partyData }}
          >
            Goto create bills
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchaseOrder;
