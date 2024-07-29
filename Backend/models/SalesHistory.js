const mongoose = require("mongoose");

const salesHistorySchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  quantity: { type: Number, required: true },
  remark: { type: String },
  action: { type: String, required: true, enum: ["added", "sold"] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SalesHistory", salesHistorySchema);
