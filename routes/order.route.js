// routes/order.js
const express = require("express");
const Order = require("../models/Order.model");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { products, totalAmount, address } = req.body;
    const order = new Order({
      user: req.user.id,
      products,
      totalAmount,
      address,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order." });
  }
});

// Get user orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "products.product"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

module.exports = router;
