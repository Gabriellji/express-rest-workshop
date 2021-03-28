const express = require("express");
//const { route } = require("../../app");
const router = express.Router();

const Anime = require("./anime.model");

// Public route
// GET all /anime/
router.get("/", async (req, res) => {
  try {
    const animes = await Anime.find();
    res.json(animes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Public route
// Get by id

router.get("/:id", async (req, res) => {
  try {
    const anime = await Anime.findOne({
      _id: req.params.id,
    });
    if (!anime) {
      return res.status(404).json({ msg: "Anime not found..." });
    }
    res.json(anime);
  } catch {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Public route
// Create

router.post("/", async (req, res) => {
  try {
    const anime = await Anime.create({
      ...req.body,
    });

    await anime.save();
    res.status(201).json(anime);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Public route
// Update

router.put("/:id", async (req, res) => {
  const { name, type_of_anime } = req.body;
  const newAnime = { name, type_of_anime };
  try {
    const updatedAnime = await Anime.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      newAnime,
      { new: true }
    );

    if (!updatedAnime) {
      return res.status(400).end();
    }
    res.status(200).json(updatedAnime);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
