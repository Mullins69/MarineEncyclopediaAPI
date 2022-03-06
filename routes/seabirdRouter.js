require("dotenv").config;

const express = require("express");
const Seabirds = require("../models/seabirds");
const auth = require("../middleware/auth");
const { getSeabirds } = require("../middleware/finders");

const router = express.Router();

// GET all seabirds
router.get("/", async (req, res) => {
  try {
    const seabirds = await Seabirds.find();
    res.status(201).send(seabirds);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one seabird
router.get("/:id", [auth, getSeabirds], (req, res, next) => {
  res.send(res.seabirds);
});

// CREATE a seabird
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

  let seabirds;

  img
    ? (seabirds = new Seabirds({
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
    : (seabirds = new Seabirds({
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
    const newSeabird = await seabirds.save();
    res.status(201).json(newSeabird);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a seabird
router.put("/:id", [auth, getSeabirds], async (req, res, next) => {
  if (req.user._id !== res.seabirds.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to update this encyclopedia",
      });
  const { title, category, description, img,distribution,habitat,feedinghabits,taxonomy, } = req.body;
  if (title) res.seabirds.title = title;
  if (category) res.seabirds.category = category;
  if (description) res.seabirds.description = description;
  if (img) res.seabirds.img = img;
  if (distribution) res.seabirds.distribution = distribution;
  if (habitat) res.seabirds.habitat = habitat;
  if (feedinghabits) res.seabirds.feedinghabits = feedinghabits;
  if (taxonomy) res.seabirds.taxonomy = taxonomy;

  try {
    const updatedSeabirds = await res.seabirds.save();
    res.status(201).send(updatedSeabirds);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a seabird
router.delete("/:id", [auth, getSeabirds], async (req, res, next) => {
  if (req.user._id !== res.seabirds.created_by)
    res
      .status(400)
      .json({
        message: "You do not have the permission to delete this encyclopedia",
      });
  try {
    await res.seabirds.remove();
    res.json({ message: "Deleted encyclopedia" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
