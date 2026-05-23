console.log("Starting server...");
const express = require("express");
const cors = require("cors");
const productRoutes =
require("./routes/products");
const orderRoutes =
require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/api/products",
  productRoutes
);
app.use(
  "/api/orders",
  orderRoutes
);

// Test Route
app.get("/", (req,res)=>{

  res.send("Express Backend Running");

});

const PORT = 5000;

app.listen(PORT,()=>{

  console.log(
    `Server running on ${PORT}`
  );

});