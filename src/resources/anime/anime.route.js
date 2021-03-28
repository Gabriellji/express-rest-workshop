const express = require("express");
const { route } = require("../../app");
const router = express.Router();

const Anime = require("./anime.model");

// Public route
// GET all /anime/
router.get('/', async (req, res) => {
    try {
        const animes = await Anime.find()
        res.json(animes)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// Public route
// Get by id

router.get('/:id', async (req, res) => {
    try {
        const anime = await Anime.findOne({
            _id: req.params.id
        })
        if(!anime) {
            return res.status(404).json({msg: "Anime not found..."})
        }
        res.json(anime)
    } catch {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})



router.post("/", async (req, res) => {
  try {
    const anime = Anime.create({
        name: req.body,
        type: req.body
    });

    await anime.save()
    res.status(201).json(anime)
  } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error')
  }
});

module.exports = router;
