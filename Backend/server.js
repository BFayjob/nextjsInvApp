const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Models
const InitialStock = require("./models/InitialStock");
const SalesHistory = require("./models/SalesHistory");

// Routes
app.get("/items", async (req, res) => {
  try {
    const items = await InitialStock.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
});

app.post("/items", async (req, res) => {
  try {
    const { brand, size, quantity, remark } = req.body;
    let item = await InitialStock.findOne({ brand, size });
    if (item) {
      item.quantity += parseInt(quantity, 10);
    } else {
      item = new InitialStock({ brand, size, quantity, remark });
    }
    const savedItem = await item.save();

    const sale = new SalesHistory({
      item: savedItem._id,
      quantity,
      remark,
      action: "added",
    });
    await sale.save();

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: "Error adding item" });
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, remark } = req.body;
    const item = await InitialStock.findById(id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (item.quantity < parseInt(quantity, 10)) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    item.quantity -= parseInt(quantity, 10);
    await item.save();

    const sale = new SalesHistory({
      item: id,
      quantity,
      remark,
      action: "sold",
    });
    await sale.save();

    // Fetch updated sales history data
    const salesHistory = await SalesHistory.find().populate("item");

    res.status(200).json({ item, salesHistory });
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});

app.get("/history", async (req, res) => {
  try {
    const salesHistory = await SalesHistory.find().populate("item");
    res.status(200).json(salesHistory);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales history" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
