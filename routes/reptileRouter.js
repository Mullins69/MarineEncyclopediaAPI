require("dotenv").config;

const express = require("express");
const Reptiles = require("../models/reptiles");
const auth = require("../middleware/auth");
const { getReptiles } = require("../middleware/finders");

const router = express.Router();

// GET all Reptiles
router.get("/", async (req, res) => {
  try {
    const reptiles = await Reptiles.find();
    res.status(201).send(reptiles);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one reptile
router.get("/:id", [auth, getReptiles], (req, res, next) => {
  res.send(res.reptiles);
});

// CREATE a reptile
router.post("/", auth, async (req, res, next) => {
  const {
    title,
    category,
    description,
    img,
    distribution,
    habitat,
    feedinghabits,
    taxonomy,
  } = req.body;

  let reptiles;

  img
    ? (reptiles = new Reptiles({
        title,
        category,
        distribution,
        habitat,
        feedinghabits,
        taxonomy,
        description,
        created_by: req.user._id,
        img,
      }))
    : (reptiles = new Reptiles({
        title,
        category,
        distribution,
        habitat,
        feedinghabits,
        taxonomy,
        description,
        created_by: req.user._id,
        img,
      }));

  try {
    const newReptiles = await reptiles.save();
    res.status(201).json(newReptiles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a reptile
router.put("/:id", [auth, getReptiles], async (req, res, next) => {
  if (req.user._id !== res.reptiles.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to update this encyclopedia",
      });
  const { title, category, description, img,distribution,habitat,feedinghabits,taxonomy, } = req.body;
  if (title) res.reptiles.title = title;
  if (category) res.reptiles.category = category;
  if (description) res.reptiles.description = description;
  if (img) res.reptiles.img = img;
  if (distribution) res.reptiles.distribution = distribution;
  if (habitat) res.reptiles.habitat = habitat;
  if (feedinghabits) res.reptiles.feedinghabits = feedinghabits;
  if (taxonomy) res.reptiles.taxonomy = taxonomy;

  try {
    const updatedReptiles = await res.reptiles.save();
    res.status(201).send(updatedReptiles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a reptile
router.delete("/:id", [auth, getReptiles], async (req, res, next) => {
  if (req.user._id !== res.reptiles.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to delete this encyclopedia",
      });
  try {
    await res.reptiles.remove();
    res.json({ message: "Deleted encyclopedia" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
