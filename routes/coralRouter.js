require("dotenv").config;

const express = require("express");
const Corals = require("../models/corals");
const auth = require("../middleware/auth");
const { getCorals } = require("../middleware/finders");

const router = express.Router();

// GET all Corals
router.get("/", async (req, res) => {
  try {
    const corals = await Corals.find();
    res.status(201).send(corals);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one Coral
router.get("/:id", [auth, getCorals], (req, res, next) => {
  res.send(res.corals);
});

// CREATE a Coral
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

  let corals;

  img
    ? (corals = new Corals({
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
    : (corals = new Corals({
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
    const newCorals = await corals.save();
    res.status(201).json(newCorals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a corals
router.put("/:id", [auth, getCorals], async (req, res, next) => {
  if (req.user._id !== res.corals.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to update this encyclopedia",
      });
  const { title, category, description, img,distribution,habitat,feedinghabits,taxonomy, } = req.body;
  if (title) res.corals.title = title;
  if (category) res.corals.category = category;
  if (description) res.corals.description = description;
  if (img) res.corals.img = img;
  if (distribution) res.corals.distribution = distribution;
  if (habitat) res.corals.habitat = habitat;
  if (feedinghabits) res.corals.feedinghabits = feedinghabits;
  if (taxonomy) res.corals.taxonomy = taxonomy;

  try {
    const updatedCorals = await res.corals.save();
    res.status(201).send(updatedCorals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a coral
router.delete("/:id", [auth, getCorals], async (req, res, next) => {
  if (req.user._id !== res.corals.created_by)
    res
      .status(400)
      .json({
        message: "Yoau do not have the permission to delete this encyclopedia",
      });
  try {
    await res.corals.remove();
    res.json({ message: "Deleted encyclopedia" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
