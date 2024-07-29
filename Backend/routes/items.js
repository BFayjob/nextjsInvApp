const express = require("express");
const router = express.Router();
const InitialStock = require("../models/InitialStock");
const SalesHistory = require("../models/SalesHistory");

// Fetch all initial stock items
router.get("/items", async (req, res) => {
  try {
    const items = await InitialStock.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
});

// Add or update an item
router.post("/items", async (req, res) => {
  try {
    const { brand, size, quantity, remark } = req.body;
    let item = await InitialStock.findOne({ brand, size });
    if (item) {
      item.quantity += parseInt(quantity, 10);
    } else {
      item = new InitialStock({ brand, size, quantity, remark });
    }
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: "Error adding item" });
  }
});

// Update an item (sell)
router.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, remark } = req.body;
    const item = await InitialStock.findById(id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.quantity -= parseInt(quantity, 10);
    if (item.quantity < 0) item.quantity = 0;
    await item.save();

    const sale = new SalesHistory({
      item: id,
      quantity,
      remark,
      action: "sold",
    });
    await sale.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});

module.exports = router;
