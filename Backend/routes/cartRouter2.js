const express = require('express');
const isLoggedInUser  = require('../middlewares/isLoggedInUser');
const cartModel = require('../models/cart_model');
const userModel = require('../models/user_model');
const router = express.Router();
const mongoose=require("mongoose")

// 1. Add to Cart
router.post('/addtocart/:id', isLoggedInUser , async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    // Check if product is already in cart*7i
    const existingCart = await cartModel.findOne({ user: userId, product: productId });
    if (existingCart) {
      req.flash('error', "Product is already added");
      res.json({ error: "Product is already added", flash: req.flash() });
    } else {
      // Create a new cart item
      const newCartItem = new cartModel({ user: userId, product: productId, quantity: 1 });
      await newCartItem.save();
      req.flash('success', "Successfully added to cart");
      res.status(201).json({ message: "Product added to cart", flash: req.flash() });
    }
  } catch (err) {
    req.flash('error', "Error while adding to cart");
    res.status(400).json({ error: "Something went wrong", flash: req.flash() });
  }
});

// 2. Update Quantity
router.put('/updatequantity/:id', isLoggedInUser , async (req, res) => {
    try {
      const userId = req.user._id;
      const productId = req.params.id;
      const operation = req.body.operation;

      console.log(operation)
  
      // Check if the product ID is valid
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }

  
      // Update the quantity
      const cartItem = await cartModel.findOneAndUpdate(
        { user: userId, product: productId },
        { $inc: { quantity: operation === 'increase' ? 1 : -1 } },
        { new: true }
      );
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
    req.flash('success',"Quantity Updated")
      res.status(200).json({ message: 'Quantity updated successfully', cartItem,flash:req.flash() });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// 3. Delete from Cart
router.delete('/removefromcart/:id', isLoggedInUser , async (req, res) => {
    try {
      const userId = req.user._id;
      const productId = req.params.id;
  
      // Check if the product ID is valid
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
  
      // Remove the cart item
      const cartItem = await cartModel.findOneAndDelete({ user: userId, product: productId });
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      res.status(200).json({ message: 'Product removed from cart' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// 4. Fetching all Products from cart
router.get('/cartproducts', isLoggedInUser, async (req, res) => {
    try {
      const userId = req.user._id;
  
      // Fetch cart items
      let cartItems = await cartModel.find({ user: userId })
        .populate('product')
        .exec();
  
      if (!cartItems) {
        return res.status(404).json({ error: "No cart items found" });
      }
  
      cartItems = cartItems.map(items => {
        return {
          ...items._doc,
          image: items.product.image ? items.product.image.toString('base64') : null
        }
      })
  
      // Calculate cart total
      const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      res.json({ cartItems, total, loggedin: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

module.exports = router;