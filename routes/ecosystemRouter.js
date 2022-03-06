require("dotenv").config;

const express = require("express");
const Ecosytems = require("../models/ecosystems");
const auth = require("../middleware/auth");
const { getEcosystems } = require("../middleware/finders");

const router = express.Router();

// GET all Ecosystem
router.get("/", async (req, res) => {
  try {
    const ecosystems = await Ecosytems.find();
    res.status(201).send(ecosystems);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one ecosystem
router.get("/:id", [auth, getEcosystems], (req, res, next) => {
  res.send(res.ecosystems);
});

// CREATE a ecosystem
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

  let ecosystems;

  img
    ? (ecosystems = new Ecosytems({
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
    : (ecosystems = new Ecosytems({
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
    const newEcosystem = await ecosystems.save();
    res.status(201).json(newEcosystem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a ecosystem
router.put("/:id", [auth, getEcosystems], async (req, res, next) => {
  if (req.user._id !== res.ecosystems.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to update this encyclopedia",
      });
  const { title, category, description, img,distribution,habitat,feedinghabits,taxonomy, } = req.body;
  if (title) res.ecosystems.title = title;
  if (category) res.ecosystems.category = category;
  if (description) res.ecosystems.description = description;
  if (img) res.ecosystems.img = img;
  if (distribution) res.ecosystems.distribution = distribution;
  if (habitat) res.ecosystems.habitat = habitat;
  if (feedinghabits) res.ecosystems.feedinghabits = feedinghabits;
  if (taxonomy) res.ecosystems.taxonomy = taxonomy;

  try {
    const updatedEcosystem = await res.ecosystems.save();
    res.status(201).send(updatedEcosystem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a cephalopod
router.delete("/:id", [auth, getEcosystems], async (req, res, next) => {
  if (req.user._id !== res.ecosystems.created_by)
    res
      .status(400)
      .json({
        message: "Yoau do not have the permission to delete this encyclopedia",
      });
  try {
    await res.ecosystems.remove();
    res.json({ message: "Deleted encyclopedia" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
