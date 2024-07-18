import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addEstimate } from "../store/estimateSlice";
import {
  addPurchaseItem,
  clearpurchaseItem,
  removeItem,
} from "../store/purchaseItem";
import { MdDelete } from "react-icons/md";

const CreateEstimate = () => {
  const estimateData = useSelector((state) => state.estimate).estimate;
  const dispatch = useDispatch();
  const purchaseItemData = useSelector(
    (state) => state.purchaseItem
  ).purchaseItem;

  // const [purchaseOrders, setPurchaseOrders] = useState(estimateData);
  const [items, setItems] = useState(purchaseItemData || []);
  const [date1, setDate1] = useState("");
  const [ref, setRef] = useState(
    Number(estimateData[estimateData.length - 1]?.number) + 1 || 1
  );
  const [addRow, setAddRow] = useState(false);
  const [partyData, setPartyData] = useState({});

  // State for form fields
  const [customerName, setCustomerName] = useState("");
  const [type, setType] = useState("Sale");

  const [totalAmount, setTotalAmount] = useState(0);
  const [toatalquantity, setTotalQuantity] = useState(0);
  const [round, setRound] = useState(false);

  // add Item code
  const [formData, setFormData] = useState({
    item: "",
    qty: "",
    unit: "",
    pricePerUnit: Number,
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
    // setItems([...items, newItem]);
    // localStorage.setItem("items", JSON.stringify([...items, newItem]));
    dispatch(addPurchaseItem(newItem));
    setItems([...items, newItem]);
    setFormData({
      item: "",
      qty: "",
      unit: "",
      pricePerUnit: Number,
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
  useEffect(() => {
    let total = 0;
    let toatalQty = 0;
    items.forEach((item) => {
      total += item.amount;
      toatalQty += Number(item.qty);
    });
    setTotalQuantity(toatalQty);
    setTotalAmount(total);
  }, [items]);
  const saveEstimate = (e) => {
    e.preventDefault();
    const tableData = {
      party: customerName,
      number: Number(estimateData[estimateData.length - 1]?.number) + 1 || 1,
      date: date1,
      toatalquantity: toatalquantity,
      totalAmount: totalAmount,
      type: type,
    };
    setPartyData(tableData);
    dispatch(addEstimate(tableData));
    alert("Saved");
  };
  const handleClear = () => {
    setCustomerName("");
    setRef(Number(estimateData[estimateData.length - 1]?.number) + 1 || 1);

    dispatch(clearpurchaseItem());
  };
  const handleDelete = (index) => {
    dispatch(removeItem(index));
  };
  useEffect(() => {
    setItems(purchaseItemData);
  }, [saveEstimate, handleDelete]);

  return (
    <div className="w-full p-4">
      <div className=" w-full  ">
        <div className="flex items-center justify-between w-full">
          <h2 className=" text-2xl">Estimate/Quatation</h2>
        </div>
        <form onSubmit={saveEstimate} className="">
          <div className="flex w-full justify-end items-center gap-3">
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className=" py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Save
              </button>
            </div>
            <div className="flex items-center justify-end  ">
              <Link
                to={"/view-estimate"}
                className="  py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                View Estimate Data
              </Link>
            </div>
          </div>

          <div className="flex w-full justify-center items-center py-3">
            <div className="w-full gap-3 ">
              <div className=" w-full flex items-center justify-between">
                <label htmlFor="customerName" className=" w-1/3 mb-2">
                  Party Name:
                </label>
                <input
                  id="customerName"
                  required
                  className="w-2/3 mx-4 py-2 border rounded-md"
                  name="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className=" w-full flex items-center p-1 justify-between">
                <label htmlFor="type" className=" w-1/3 mb-2">
                  Select Party:
                </label>
                <select
                  id="type"
                  required
                  className="w-2/3 mx-4 py-2 border rounded-md"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Sale">Sale</option>
                  <option value="Purchase">Purchase</option>
                </select>
              </div>
            </div>

            <div className="flex w-1/2 flex-col items-center justify-center">
              <div className="mb-2  w-full items-center flex justify-center">
                <label htmlFor="number1" className="1/3 mb-2 mr-3">
                  Reference No:
                </label>
                <input
                  type="number"
                  id="number1"
                  className="w-2/3 px-4 py-2 border rounded-md mr-0"
                  value={ref}
                  onChange={(e) => setRef(e.target.value)}
                />
              </div>
              <div className="mb-4  w-full flex justify-center">
                <label htmlFor="Invoice" className="inline-block 1/3 mb-2 mr-4">
                  Invoice Date:
                </label>
                <input
                  type="Date"
                  id="Invoice"
                  className="w-2/3 px-4 py-2 border rounded-md"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </form>
        <hr />
        <div className="py-2 flex items-center justify-end mr-5 ">
          <button
            onClick={handleClear}
            className=" py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Clear items
          </button>
        </div>

        <div className="flex items-center w-full justify-center p-4">
          <div className="w-full mx-auto">
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
                  <th className="border border-gray-200 px-2 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
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
                      {item.amount.toFixed(2)} Rs
                    </td>
                    <td className="border  border-gray-200 px-2 py-2">
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
                    {totalAmount.toFixed(2) + " Rs"}
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
                        value={formData.item || ""}
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
                        value={formData.unit || ""}
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
                        value={formData.pricePerUnit || ""}
                        onChange={handleChange}
                        placeholder="Price Per Unit without tax"
                        className=" border  m-3  px-4 text-black rounded"
                        required
                      />
                      <select
                        id="unist"
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
        <div className="flex items-end gap-4 w-full justify-center p-4">
          <div>
            <input
              type="checkbox"
              id="round"
              onChange={(e) => {
                setRound(!round);
              }}
            />
            <label htmlFor="round"> Round Off</label>
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
        <hr />
        <div className="flex justify-end w-full">
          <div className="flex justify-end items-end">
            <Link
              to={"/create-estimate-bills"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 py-2 px-4 rounded"
              state={{ purchaseItemData, partyData }}
            >
              Goto create bills
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEstimate;
