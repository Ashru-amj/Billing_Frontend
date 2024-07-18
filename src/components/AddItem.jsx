import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/itemSlice";
import { FaSearch, FaTrashAlt } from "react-icons/fa";

const AddItem = () => {
  const itemData = useSelector((state) => state.item).item;
  const dispatch = useDispatch();

  const [items, setItems] = useState(itemData);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: itemName,
      price: itemPrice,
      qty: quantity,
    };

    dispatch(addItem(newItem));
    setItemName("");
    setItemPrice("");
    setQuantity("");
    setItems(itemData);
  };

  const handleDelete = (index) => {
    dispatch(removeItem(index));
  };

  useEffect(() => {
    const filteredItems = itemData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setItems(filteredItems);
  }, [searchQuery, itemData]);
  const handleInstructionsToggle = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="mx-auto mt-2 h-[90vh] p-4">
      <button
        onClick={handleInstructionsToggle}
        className="absolute top-4 right-4 bg-gray-300 text-black px-4 my-16 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
      >
        Instructions
      </button>

      {showInstructions && (
        <div className="absolute top-16 right-4 bg-white border border-gray-300 rounded-md p-4 shadow-lg z-50">
          <h2 className="text-lg font-bold mb-2">
            Inventory Items Instructions
          </h2>
          <ol className="list-decimal list-inside">
            <li>Enter item name, quantity, and price.</li>
            <li>Click on the add item.</li>
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

      <h1
        style={{ color: "orange", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
        className="text-3xl mb-6"
      >
        Inventory items
      </h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex justify-between items-center">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemName"
            >
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter item name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemPrice"
            >
              Item Price
            </label>
            <input
              type="number"
              id="itemPrice"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter item price"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter item quantity"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Item
        </button>
      </form>
      <div className="flex py-4 items-center justify-end gap-4">
        <label htmlFor="searchQuery"> Search Items</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search items"
          className="px-4 py-2 border rounded-md mr-2 focus:outline-none"
        />
        <FaSearch className="text-gray-700" />
      </div>
      <div className="mt-4">
        <h2 className="text-2xl flex items-center justify-center font-bold">
          Items
        </h2>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Sl No.</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.qty}</td>
                <td
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrashAlt />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddItem;
