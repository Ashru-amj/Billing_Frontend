import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addExpenceItem,
  clearExpenceItem,
  removeExpenceItem,
} from "../store/expenceItem";
import { addExpence } from "../store/expenceSlice";
import { MdDelete } from "react-icons/md";
import { unitData } from "../utils/state";

const CreateExpence = () => {
  const dispatch = useDispatch();
  const expenseData = useSelector((state) => state.expence).expence;
  const expenceItem = useSelector((state) => state.expenceItem).expenceItem;

  const [partyData, setPartyData] = useState({});
  const [orderNo, setOrderNo] = useState(
    Number(expenseData[expenseData.length - 1]?.number) + 1 || 1
  );
  const [addRow, setAddRow] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [toatalquantity, setTotalQuantity] = useState(0);
  const [round, setRound] = useState(false);
  const [items, setItems] = useState(expenceItem);
  const [orderDate, setOrderDate] = useState("");
  const [purchaserName, setPurchaserName] = useState("");
  const [purchaseCat, setPurchaseCat] = useState("");
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
    const taxAmount =
      (Number(formData.qty) * Number(formData.pricePerUnit) * Number(taxData)) /
      100;
    const newItem = {
      ...formData,
      amount: Number(formData.qty) * Number(formData.pricePerUnit) + taxAmount,
      taxAmount: taxAmount,
    };
    dispatch(addExpenceItem(newItem));
    setFormData({
      item: "",
      qty: "",
      unit: "",
      pricePerUnit: "",
      tax: "",
    });
  };
  useEffect(() => {
    const obj = {
      party: purchaserName,
      number: orderNo,
      date: orderDate || new Date().toLocaleDateString(),
      purchaseCat,
      totalAmount: totalAmount,
      toatalquantity,
    };
    setPartyData(obj);
  }, [purchaseCat, purchaserName, totalAmount, orderDate, toatalquantity]);

  const taxData = [28, 18, 12, 16];

  const saveExpence = (e) => {
    e.preventDefault();
    const obj = {
      party: purchaserName,
      number: orderNo,
      date: orderDate || new Date().toLocaleDateString(),
      purchaseCat,
      totalAmount: totalAmount,
      toatalquantity,
    };
    setPartyData(obj);
    dispatch(addExpence(obj));
    alert("successfully updated");
  };

  const handleClear = () => {
    dispatch(clearExpenceItem());
    setTotalAmount(0);
    setTotalQuantity(0);

    setPurchaserName("");

    setOrderNo(Number(expenseData[expenseData.length - 1]?.number) + 1 || 1);
  };

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
  const handleDelete = (index) => {
    dispatch(removeExpenceItem(index));
  };
  useEffect(() => {
    setItems(expenceItem);
  }, [handleSubmit, handleDelete]);
  return (
    <div className="w-full p-2">
      <hr />
      <div className="w-full pt-2">
        <form className="w-full " onSubmit={saveExpence}>
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
                to={"/expence-data"}
                className="  py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                view Expences
              </Link>
            </div>
          </div>
          <div className="flex w-full justify-between items-center ">
            <div className="container mx-auto p-2">
              <div className="mb-2 w-full items-center flex  ">
                <label htmlFor="purchaserName" className="1/3 mb-2 mr-7">
                  Party Name
                </label>
                <input
                  type="text"
                  id="purchaserName"
                  className="w-full px-4 py-1 border rounded-md mr-0"
                  value={purchaserName}
                  onChange={(e) => setPurchaserName(e.target.value)}
                  required
                  placeholder="Enter Pary Name"
                />
              </div>
              <div className="mb-2 w-full items-center flex  ">
                <label
                  htmlFor="number1"
                  className="1/3 mb-2 mr-3"
                  aria-required
                >
                  Party category
                </label>

                <select
                  id="type"
                  required
                  name="purchaseCat"
                  className="w-full py-2 border rounded-md"
                  value={purchaseCat}
                  onChange={(e) => setPurchaseCat(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Sale">Sale</option>
                </select>
              </div>
            </div>

            <div className="flex w-1/2 flex-col items-center justify-center">
              <div className="mb-2 w-full items-center flex justify-center">
                <label htmlFor="number1" className="1/3 mb-2 mr-3">
                  Expense No:
                </label>
                <input
                  type="number"
                  id="number1"
                  className="w-2/3 px-4 py-1 border rounded-md mr-0"
                  value={orderNo}
                  onChange={(e) => setOrderNo(e.target.value)}
                />
              </div>

              <div className="mb-2 w-full flex justify-center">
                <label htmlFor="number" className="inline-block 1/3 mb-2 mr-4">
                  Date:
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
                    Price/Unit (with tax)
                  </th>
                  <th className="border border-gray-200 px-4 py-2">GST </th>
                  <th className="border border-gray-200 px-4 py-2">Money</th>

                  <th className="border border-gray-200 px-4 py-2">Amount</th>
                  <th className="border border-gray-200 px-4 py-2">Delete</th>
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
                      {item.taxAmount.toFixed(2)}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.amount.toFixed(2)}
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
                    colSpan="3"
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
                <div className="flex w-full h-full justify-between items-center">
                  <div className="w-full flex">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="item"
                        value={formData.item || ""}
                        onChange={handleChange}
                        placeholder="Item"
                        className="border m-3 px-4 text-black rounded"
                        required
                      />
                      <input
                        type="number"
                        name="qty"
                        value={formData.qty || ""}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="border m-3 px-4 text-black rounded"
                        required
                      />
                      <select
                        id="unit"
                        name="unit"
                        value={formData.unit || ""}
                        onChange={handleChange}
                        className="border m-3 px-4 text-black rounded"
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
                        className="border m-3 px-4 text-black rounded"
                        required
                      />
                      <select
                        id="unist"
                        name="tax"
                        value={formData.tax || ""}
                        onChange={handleChange}
                        className="border m-3 px-4 text-black rounded"
                        required
                      >
                        <option value="0">Select GST</option>
                        <option value="0">GST@0%</option>
                        <option value="0">IGST@0%</option>
                        <option value="5">GST5%</option>
                        <option value="5">IGST5%</option>
                        <option value="12">GST12%</option>
                        <option value="12">IGST12%</option>
                        <option value="18">GST18%</option>
                        <option value="18">IGST18%</option>
                        <option value="28">GST28%</option>
                        <option value="28">IGST28%</option>
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
              <div className="flex">
                Total Amount:
                <span className="border mx-4 px-4">
                  {totalAmount.toFixed(2)}
                </span>
              </div>
            ) : (
              <div className="flex">
                Total Amount:
                <span className="border mx-4 px-4">
                  {Math.round(totalAmount)}
                </span>
              </div>
            )}
          </div>
        </div>

        <hr />
        <div className="flex justify-end items-end">
          <Link
            to={"/create-expence-bills"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 py-2 px-4 rounded"
            state={{ items, partyData }}
          >
            Goto create bills
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CreateExpence;
