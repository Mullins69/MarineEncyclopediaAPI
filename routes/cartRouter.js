const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Cart = require("../models/cart");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { getUser, getProduct } = require("../middleware/finders");

//getting all items in cart
router.get("/", auth, async (req, res, next) => {
  try {
    const cart = await Cart.find({ user_id: { $regex: req.user._id } });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Adds a new item to the users cart
router.post("/:id", [auth, getProduct], async (req, res, next) => {
  const user = await User.findById(req.user.user_id);
  const cart = await Cart.find({"user_id": {$regex : req.user._id}});

  // console.log(user)
  let product_id = res.product._id;
  let title = res.product.title;
  let category = res.product.category;
  let img = res.product.img;
  let price = res.product.price;
  let quantity = req.body;
  let user_id = req.user._id;
  const carts = new Cart({

     product_id,
   title,
   category,
   img,
   price ,
   quantity,
   user_id,
  })
  try {
    carts.cart.push({
    
      product_id,
      title,
      category,
      img,
      price,
      quantity,

    });
    const updatedCart = await carts.save();
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json(console.log(error));
  }
});
//updates the items in the users cart
router.put("/:id", [auth, getProduct], async (req, res, next) => {
  const cart = await Cart.find({ user_id: { $regex: req.user.user_id } });

  const inCart = cart.cart.some((prod) => prod._id == req.params.id);
  if (inCart) {
    product.quantity += req.body.quantity;
    const updatedUser = await cart.save();
    try {
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json(console.log(error));
    }
  } else {
    try {
      // console.log(Array.isArray(user.cart))
      // user.cart = []
      let product_id = res.product._id;
      let title = res.product.title;
      let category = res.product.category;
      let img = res.product.img;
      let price = res.product.price;
      let quantity = req.body;
      let created_by = req.user._id;
      const carts = new Cart({
             product_id,
           title,
           category,
           img,
           price ,
           quantity,
           created_by
          })
  
      carts.cart.push({
        product_id,
        title,
        category,
        img,
        price,
        quantity,
        created_by,
      });
      const updatedUser = await carts.save();
      res.status(201).json(updatedUser.cart);
    } catch (error) {
      res.status(500).json(console.log(error));
    }
  }
});
//clears the user cart
router.delete("/", auth, async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndDelete({ user_id: { $regex: req.user._id } });
    res.json({ message: "Deleted cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
