const mongoose = require("mongoose");
const InitialStock = require("./models/InitialStock");

const initialStocks = [
  { brand: "bluecrown", size: "2mm" },
  { brand: "bluecrown", size: "3mm" },
  { brand: "bluecrown", size: "4mm" },
  { brand: "bluecrown", size: "6mm" },
  { brand: "bluecrown", size: "9mm" },
  { brand: "ecofloat", size: "3mm" },
  { brand: "ecofloat", size: "4mm" },
  { brand: "ecofloat", size: "6mm" },
  { brand: "ecofloat", size: "9mm" },
  { brand: "coppens", size: "0.2mm" },
  { brand: "coppens", size: "0.3mm" },
  { brand: "coppens", size: "0.5mm" },
  { brand: "coppens", size: "0.8mm" },
  { brand: "coppens", size: "1.2mm" },
  { brand: "coppens", size: "1.5mm" },
  { brand: "coppens", size: "2mm" },
  { brand: "aqualis", size: "2mm" },
  { brand: "alpha +", size: "4mm" },
  { brand: "alpha +", size: "6mm" },
  { brand: "alpha +", size: "8mm" },
  { brand: "ace", size: "3mm" },
  { brand: "ace", size: "4mmGL" },
  { brand: "ace", size: "4mmRL" },
  { brand: "ace", size: "6mm" },
  { brand: "ace", size: "8mm" },
  { brand: "Dickem", size: "3mm" },
  { brand: "Dickem", size: "4mm" },
  { brand: "Dickem", size: "6mm" },
];

mongoose.connect(
  "mongodb+srv://bojyaf:qwerty1234@cluster0.f7wclz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const initializeStock = async () => {
  await InitialStock.deleteMany({});
  await InitialStock.insertMany(initialStocks);
  console.log("Stock initialized");
  mongoose.connection.close();
};

initializeStock().catch((err) => {
  console.error("Error initializing stock:", err);
  mongoose.connection.close();
});
