const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

  res.json([
    {
      id:1,
      title:"iPhone 15",
      price:79999
    },
    {
      id:2,
      title:"MacBook Air",
      price:120000
    }
  ]);

});

module.exports = router;