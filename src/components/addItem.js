// api/addItem.js
"use server";

import axios from "axios";

export async function addItem(brand, size, quantity, remark) {
  try {
    const response = await axios.post("http://localhost:5000/items", {
      brand,
      size,
      quantity: parseInt(quantity, 10),
      remark,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}
