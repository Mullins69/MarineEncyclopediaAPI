// This is used to find various Schemas
const User = require("../models/user");
const Product = require("../models/product");
const Encyclopedia = require("../models/encyclopedia");

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
async function getEncyclopedia(req, res, next) {
  let encyclopedia;
  try {
    encyclopedia = await Encyclopedia.findById(req.params.id);
    if (!encyclopedia) res.status(404).json({ message: "Could not find Encyclopedia" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.encyclopedia = encyclopedia;
  next();
}

module.exports = { getUser, getProduct, getEncyclopedia };
