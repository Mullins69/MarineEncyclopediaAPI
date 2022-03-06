// This is used to find various Schemas
const User = require("../models/user");
const Product = require("../models/product");
const Cephalopods = require("../models/cephalopods");
const Corals = require("../models/corals")
const Mammals = require("../models/mammals")
const Ecosystems = require("../models/ecosystems")
const Fishes = require("../models/fishes")
const Reptiles = require("../models/reptiles")
const Seabirds = require("../models/seabirds")
const Sharks = require("../models/sharks")


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
async function getCorals(req, res, next) {
  let corals;
  try {
    corals = await Corals.findById(req.params.id);
    if (!corals) res.status(404).json({ message: "Could not find Corals" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.corals = corals;
  next();
}
async function getMammals(req, res, next) {
  let mammals;
  try {
    mammals = await Mammals.findById(req.params.id);
    if (!mammals) res.status(404).json({ message: "Could not find Mammals" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.mammals = mammals;
  next();
}
async function getEcosystems(req, res, next) {
  let ecosystems;
  try {
    ecosystems = await Ecosystems.findById(req.params.id);
    if (!ecosystems) res.status(404).json({ message: "Could not find ecosystem" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.ecosystems = ecosystems;
  next();
}
async function getFishes(req, res, next) {
  let fishes;
  try {
    fishes = await Fishes.findById(req.params.id);
    if (!fishes) res.status(404).json({ message: "Could not find Fish" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.fishes = fishes;
  next();
}
async function getReptiles(req, res, next) {
  let reptiles;
  try {
    reptiles = await Reptiles.findById(req.params.id);
    if (!Reptiles) res.status(404).json({ message: "Could not find Reptile" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.reptiles = reptiles;
  next();
}
async function getSeabirds(req, res, next) {
  let seabirds;
  try {
    seabirds = await Seabirds.findById(req.params.id);
    if (!seabirds) res.status(404).json({ message: "Could not find Seabird" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.seabirds = seabirds;
  next();
}
async function getSharks(req, res, next) {
  let sharks;
  try {
    sharks = await Sharks.findById(req.params.id);
    if (!sharks) res.status(404).json({ message: "Could not find Shark/Ray" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.sharks = sharks;
  next();
}

module.exports = { getUser, getProduct, getCephalopods, getCorals, getMammals , getEcosystems, getFishes, getReptiles, getSeabirds,getSharks };
