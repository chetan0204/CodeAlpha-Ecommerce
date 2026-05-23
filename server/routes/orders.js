const express = require("express");

const router = express.Router();

// Dummy Order Route
router.post("/", (req,res)=>{

  const order =
    req.body;

  console.log(order);

  res.json({
    success:true,
    message:"Order received",
    order
  });

});

module.exports = router;