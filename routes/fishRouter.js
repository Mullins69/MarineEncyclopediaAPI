require("dotenv").config;

const express = require("express");
const Fishes = require("../models/fishes");
const auth = require("../middleware/auth");
const { getFishes } = require("../middleware/finders");

const router = express.Router();

// GET all Fish
router.get("/", async (req, res) => {
  try {
    const fishes = await Fishes.find();
    res.status(201).send(fishes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one fish
router.get("/:id", [auth, getFishes], (req, res, next) => {
  res.send(res.fishes);
});

// CREATE a fish
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

  let fishes;

  img
    ? (fishes = new Fishes({
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
    : (fishes = new Fishes({
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
    const newFish = await fishes.save();
    res.status(201).json(newFish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a fish
router.put("/:id", [auth, getFishes], async (req, res, next) => {
  if (req.user._id !== res.fishes.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to update this encyclopedia",
      });
  const { title, category, description, img,distribution,habitat,feedinghabits,taxonomy, } = req.body;
  if (title) res.fishes.title = title;
  if (category) res.fishes.category = category;
  if (description) res.fishes.description = description;
  if (img) res.fishes.img = img;
  if (distribution) res.fishes.distribution = distribution;
  if (habitat) res.fishes.habitat = habitat;
  if (feedinghabits) res.fishes.feedinghabits = feedinghabits;
  if (taxonomy) res.fishes.taxonomy = taxonomy;

  try {
    const updatedFish = await res.fishes.save();
    res.status(201).send(updatedFish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a fish
router.delete("/:id", [auth, getFishes], async (req, res, next) => {
  if (req.user._id !== res.fishes.created_by)
    res
      .status(400)
      .json({
        message: "Yoau do not have the permission to delete this encyclopedia",
      });
  try {
    await res.fishes.remove();
    res.json({ message: "Deleted encyclopedia" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
