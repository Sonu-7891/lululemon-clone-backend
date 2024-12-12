
const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist.model");
const { verifyToken } = require("../middlewares/authMiddleware");

// Add product to wishlist
router.post("/add", verifyToken, async (req, res) => {
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, items: [] });
    }

    wishlist.items.push({ product: productId });
    await wishlist.save();

    res.status(201).send("Product added to wishlist");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding product to wishlist");
  }
});

// Get user's wishlist
router.get("/", verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    res.status(200).json(wishlist || { items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving wishlist");
  }
});

// Remove product from wishlist
router.delete("/remove/:productId", verifyToken, async (req, res) => {
  const { productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (wishlist) {
      wishlist.items = wishlist.items.filter(
        (item) => item.product.toString() !== productId
      );
      await wishlist.save();
    }

    res.status(200).send("Product removed from wishlist");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing product from wishlist");
  }
});

module.exports = router;
