const Item = require("../models/Item");
const History = require("../models/SalesHistory");

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

exports.addItem = async (req, res) => {
  const { brand, size, quantity, remark } = req.body;

  try {
    const newItem = new Item({ brand, size, quantity, remark });
    const savedItem = await newItem.save();

    const newHistory = new History({
      action: "added",
      brand,
      size,
      quantity,
      remark,
    });
    await newHistory.save();

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: "Error adding item" });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { brand, size, quantity, remark } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { brand, size, quantity, remark },
      { new: true }
    );

    const newHistory = new History({
      action: "sold",
      brand,
      size,
      quantity,
      remark,
    });
    await newHistory.save();

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
};
