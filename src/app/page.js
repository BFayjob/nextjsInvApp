"use client"; // This directive marks the file as a Client Component

import { useState } from "react";
import AddItemPopup from "../components/AddItemPopup";
import CurrentStockTable from "../components/CurrentStockTable";
import StockHistoryTable from "../components/StockHistoryTable";

const Home = () => {
  const [items, setItems] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [handleSellConfirmation, setHandleSellConfirmation] = useState([]);

  const fetchSalesHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/history");
      setSalesHistory(response.data);
    } catch (error) {
      console.error("Error fetching sales history:", error);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await axios.post("http://localhost:5000/items", newItem);
      setItems([...items, response.data]);
      await axios.post("http://localhost:5000/history", {
        action: "added",
        ...response.data,
        date: new Date(),
      });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleSellItem = async (item) => {
    if (item.quantity === 0) {
      alert("Stock not available");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/items/${item._id}`,
        {
          quantity: 1,
          remark: "Sold 1 item",
        }
      );
      setItems(items.map((i) => (i._id === item._id ? response.data : i)));
      await fetchSalesHistory(); // Fetch updated sales history
    } catch (error) {
      console.error("Error selling item:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center text-black">
        Inventory Management
      </h1>
      <AddItemPopup onAddItem={handleAddItem} />
      <CurrentStockTable
        items={items}
        setItems={setItems}
        handleSellConfirmation={handleSellConfirmation}
      />
      <StockHistoryTable salesHistory={salesHistory} />
    </div>
  );
};

export default Home;
