// routes/cart.js
const express = require("express");
const Cart = require("../models/Cart.model");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Get user's cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart." });
  }
});

// Add product to cart
router.post("/", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        products: [{ product: productId, quantity }],
      });
    } else {
      const existingProduct = cart.products.find(
        (p) => p.product.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product to cart." });
  }
});

// Remove product from cart
router.delete("/:productId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== req.params.productId
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove product from cart." });
  }
});

module.exports = router;
