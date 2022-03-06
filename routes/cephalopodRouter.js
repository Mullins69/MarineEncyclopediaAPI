require("dotenv").config;

const express = require("express");
const Cephalopods = require("../models/cephalopods");
const auth = require("../middleware/auth");
const { getCephalopods } = require("../middleware/finders");

const router = express.Router();

// GET all Cephalopods
router.get("/", async (req, res) => {
  try {
    const cephalopods = await Cephalopods.find();
    res.status(201).send(cephalopods);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one cephalopod
router.get("/:id", [auth, getCephalopods], (req, res, next) => {
  res.send(res.cephalopods);
});

// CREATE a cephalopod
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

  let cephalopods;

  img
    ? (cephalopods = new Cephalopods({
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
    : (cephalopods = new Cephalopods({
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
    const newCephalopod = await cephalopods.save();
    res.status(201).json(newCephalopod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a cephalopod
router.put("/:id", [auth, getCephalopods], async (req, res, next) => {
  if (req.user._id !== res.cephalopods.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to update this encyclopedia",
      });
  const { title, category, description, img,distribution,habitat,feedinghabits,taxonomy, } = req.body;
  if (title) res.cephalopods.title = title;
  if (category) res.cephalopods.category = category;
  if (description) res.cephalopods.description = description;
  if (img) res.cephalopods.img = img;
  if (distribution) res.cephalopods.distribution = distribution;
  if (habitat) res.cephalopods.habitat = habitat;
  if (feedinghabits) res.cephalopods.feedinghabits = feedinghabits;
  if (taxonomy) res.cephalopods.taxonomy = taxonomy;

  try {
    const updatedCephalopods = await res.cephalopods.save();
    res.status(201).send(updatedCephalopods);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a cephalopod
router.delete("/:id", [auth, getCephalopods], async (req, res, next) => {
  if (req.user._id !== res.cephalopods.created_by)
    res
      .status(400)
      .json({
        message: "Yoau do not have the permission to delete this encyclopedia",
      });
  try {
    await res.cephalopods.remove();
    res.json({ message: "Deleted encyclopedia" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
