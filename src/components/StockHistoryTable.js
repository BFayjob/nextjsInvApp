"use client"; // This directive marks the file as a Client Component

import { useState, useEffect } from "react";
import axios from "axios";

const StockHistoryTable = ({ salesHistory }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Saleshistory");
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center text-teal-400">
        Stock History
      </h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Action</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Remark</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {salesHistory.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.item.brand}</td>
              <td>{sale.item.size}</td>
              <td>{sale.quantity}</td>
              <td>{sale.remark}</td>
              <td style={{ color: sale.action === "sold" ? "red" : "green" }}>
                {sale.action}
              </td>
              <td>{new Date(sale.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockHistoryTable;
