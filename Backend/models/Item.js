const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  remark: { type: String },
});

module.exports = mongoose.model("Item", itemSchema);
