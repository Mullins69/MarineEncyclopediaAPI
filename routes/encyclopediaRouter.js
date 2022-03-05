require("dotenv").config;

const express = require("express");
const Encycolpedia = require("../models/encyclopedia");
const auth = require("../middleware/auth");
const { getUser, getEncyclopedia } = require("../middleware/finders");


const router = express.Router();

// GET all encyclopedias
router.get("/", async (req, res) => {
  try {
    const encyclopedias = await Encycolpedia.find();
    res.status(201).send(encyclopedias);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one encyclopedia
router.get("/:id", [auth,getEncyclopedia], (req, res, next) => {
  res.send(res.encyclopedia);
});

// CREATE a encyclopedia
router.post("/", auth, async (req, res, next) => {

  const { title, category,description, img} = req.body;

  let encyclopedias;

  img
    ? (encyclopedias = new Encycolpedia({
        title,
        category,
        description,
        created_by: req.user._id,
        img,
      }))
    : (encyclopedias = new Encycolpedia({
      title,
      category,
      description,
      created_by: req.user._id,
      img,
      }));

  try {
    const newEncyclopedia = await Encycolpedia.save();
    res.status(201).json(newEncyclopedia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a encyclopedia
router.put("/:id", [auth, getEncyclopedia], async (req, res, next) => {
  if (req.user._id !== res.encyclopedia.created_by)
    res
      .status(400)
      .json({ message: "You do not have the permission to update this encyclopedia" });
  const { title, category,description, img } = req.body;
  if (title) res.product.title = title;
  if (category) res.product.category = category;
  if (description) res.product.description = description;
  if (img) res.product.img = img;

  try {
    const updatedEncyclopedia = await res.encyclopedia.save();
    res.status(201).send(updatedEncyclopedia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a encyclopedia
router.delete("/:id", [auth, getEncyclopedia], async (req, res, next) => {
  if (req.user._id !== res.encyclopedia.created_by)
    res
      .status(400)
      .json({ message: "Yoau do not have the permission to delete this encyclopedia" });
  try {
    await res.encyclopedia.remove();
    res.json({ message: "Deleted encyclopedia" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
