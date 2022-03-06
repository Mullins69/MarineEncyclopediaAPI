// This is used to find various Schemas
const User = require("../models/user");
const Product = require("../models/product");
const Cephalopods = require("../models/cephalopods");

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);

    if (!user) res.status(404).json({ message: "Could not find user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product) res.status(404).json({ message: "Could not find product" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.product = product;
  next();
}
async function getCephalopods(req, res, next) {
  let cephalopods;
  try {
    cephalopods = await Cephalopods.findById(req.params.id);
    if (!cephalopods) res.status(404).json({ message: "Could not find Cephalopod" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.cephalopods = cephalopods;
  next();
}

module.exports = { getUser, getProduct, getCephalopods };
