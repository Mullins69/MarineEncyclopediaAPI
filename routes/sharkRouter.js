require("dotenv").config;

const express = require("express");
const Sharks = require("../models/sharks");
const auth = require("../middleware/auth");
const { getSharks } = require("../middleware/finders");

const router = express.Router();

// GET all Sharks
router.get("/", async (req, res) => {
  try {
    const sharks = await Sharks.find();
    res.status(201).send(sharks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one shark
router.get("/:id", [auth, getSharks], (req, res, next) => {
  res.send(res.sharks);
});

// CREATE a shark
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

  let sharks;

  img
    ? (sharks = new Sharks({
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
    : (sharks = new Sharks({
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
    const newShark = await sharks.save();
    res.status(201).json(newShark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a shark
router.put("/:id", [auth, getSharks], async (req, res, next) => {
  if (req.user._id !== res.sharks.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to update this encyclopedia",
      });
  const { title, category, description, img,distribution,habitat,feedinghabits,taxonomy, } = req.body;
  if (title) res.sharks.title = title;
  if (category) res.sharks.category = category;
  if (description) res.sharks.description = description;
  if (img) res.sharks.img = img;
  if (distribution) res.sharks.distribution = distribution;
  if (habitat) res.sharks.habitat = habitat;
  if (feedinghabits) res.sharks.feedinghabits = feedinghabits;
  if (taxonomy) res.sharks.taxonomy = taxonomy;

  try {
    const updatedSharks = await res.sharks.save();
    res.status(201).send(updatedSharks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a shark
router.delete("/:id", [auth, getSharks], async (req, res, next) => {
  if (req.user._id !== res.sharks.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to delete this encyclopedia",
      });
  try {
    await res.sharks.remove();
    res.json({ message: "Deleted encyclopedia" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
