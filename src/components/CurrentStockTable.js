"use client"; // This directive marks the file as a Client Component

import { useState, useEffect } from "react";
import axios from "axios";

const CurrentStockTable = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantityToSell, setQuantityToSell] = useState("");
  const [remark, setRemark] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSellClick = (item) => {
    setSelectedItem(item);
  };
  const handleSellConfirmation = async () => {
    if (selectedItem && quantityToSell) {
      try {
        const updatedQuantity =
          selectedItem.quantity - parseInt(quantityToSell, 10);
        if (updatedQuantity < 0) {
          alert("Insufficient stock");
          return;
        }
        const response = await axios.put(
          `http://localhost:5000/items/${selectedItem._id}`,
          {
            quantity: updatedQuantity,
            remark,
          }
        );
        setItems(
          items.map((item) =>
            item._id === response.data._id ? response.data : item
          )
        );
        // Fetch updated sales history
        const historyResponse = await axios.get(
          "http://localhost:5000/history"
        );
        setSalesHistory(historyResponse.data);
        setSelectedItem(null);
        setQuantityToSell("");
        setRemark("");
      } catch (error) {
        console.error("Error selling item:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center text-teal-400">
        Current Stock
      </h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-black">Brand</th>
            <th className="border px-4 py-2 text-black">Size</th>
            <th className="border px-4 py-2 text-black">Quantity</th>
            <th className="border px-4 py-2 text-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td className="border px-4 py-2 text-black">{item.brand}</td>
              <td className="border px-4 py-2 text-black">{item.size}</td>
              <td className="border px-4 py-2 text-black">{item.quantity}</td>
              <td className="border px-4 py-2 text-black">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={() => handleSellClick(item)}
                >
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2 text-teal-400">
            Sell Item
          </h4>
          <p className="text-black">Brand: {selectedItem.brand}</p>
          <p className="text-black">Size: {selectedItem.size}</p>
          <p className="text-black">
            Current Quantity: {selectedItem.quantity}
          </p>
          <input
            type="number"
            placeholder="Quantity to sell"
            value={quantityToSell}
            onChange={(e) => setQuantityToSell(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
          <input
            type="text"
            placeholder="Remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
          <button
            onClick={handleSellConfirmation}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-4"
          >
            Sell
          </button>
        </div>
      )}
    </div>
  );
};

export default CurrentStockTable;
