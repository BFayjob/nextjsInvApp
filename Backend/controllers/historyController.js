const History = require("../models/SalesHistory");

exports.getHistory = async (req, res) => {
  try {
    const history = await History.find().sort({ date: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Error fetching history" });
  }
};
