"use client"; // This directive marks the file as a Client Component

import { useState } from "react";
import { addItem } from "./addItem";

const AddItemPopup = ({ onAddItem }) => {
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remark, setRemark] = useState("");

  const handleAddItem = async () => {
    if (brand && size && quantity) {
      try {
        const data = await addItem(brand, size, quantity, remark);
        onAddItem(data);
        setBrand("");
        setSize("");
        setQuantity("");
        setRemark("");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  const brandOptions = {
    bluecrown: ["2mm", "3mm", "4mm", "5mm", "6mm", "7mm", "8mm", "9mm"],
    ecofloat: ["3mm", "4mm", "5mm", "6mm", "7mm", "8mm", "9mm"],
    coppens: ["0.2mm", "0.5mm", "1mm", "2mm"],
    aqualis: ["2mm"],
    "alpha +": ["4mm", "6mm", "8mm"],
    ace: ["3mm", "4mmGL", "4mmRL", "6mm", "8mm"],
    Dickem: ["3mm", "4mm", "6mm"],
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center text-teal-400">
        Add Item
      </h3>
      <div className="space-y-4">
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select Brand
          </option>
          {Object.keys(brandOptions).map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!brand}
        >
          <option value="" disabled>
            Select Size
          </option>
          {brand &&
            brandOptions[brand].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddItem}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddItemPopup;
