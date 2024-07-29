const mongoose = require("mongoose");

const initialStockSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, default: 0 },
});

module.exports = mongoose.model("InitialStock", initialStockSchema);
