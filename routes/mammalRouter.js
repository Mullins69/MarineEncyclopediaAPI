require("dotenv").config;

const express = require("express");
const Mammals = require("../models/mammals");
const auth = require("../middleware/auth");
const { getMammals } = require("../middleware/finders");

const router = express.Router();

// GET all Mammals
router.get("/", async (req, res) => {
  try {
    const mammals = await Mammals.find();
    res.status(201).send(mammals);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one mammal
router.get("/:id", [auth, getMammals], (req, res, next) => {
  res.send(res.mammals);
});

// CREATE a mammal
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

  let mammals;

  img
    ? (mammals = new Mammals({
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
    : (mammals = new Mammals({
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
    const newMammal = await mammals.save();
    res.status(201).json(newMammal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a mammal
router.put("/:id", [auth, getMammals], async (req, res, next) => {
  if (req.user._id !== res.mammals.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to update this encyclopedia",
      });
  const { title, category, description, img,distribution,habitat,feedinghabits,taxonomy, } = req.body;
  if (title) res.mammals.title = title;
  if (category) res.mammals.category = category;
  if (description) res.mammals.description = description;
  if (img) res.mammals.img = img;
  if (distribution) res.mammals.distribution = distribution;
  if (habitat) res.mammals.habitat = habitat;
  if (feedinghabits) res.mammals.feedinghabits = feedinghabits;
  if (taxonomy) res.mammals.taxonomy = taxonomy;

  try {
    const updatedMammals = await res.mammals.save();
    res.status(201).send(updatedMammals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a mammal
router.delete("/:id", [auth, getMammals], async (req, res, next) => {
  if (req.user._id !== res.mammals.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to delete this encyclopedia",
      });
  try {
    await res.mammals.remove();
    res.json({ message: "Deleted encyclopedia" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
