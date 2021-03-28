const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Anime = mongoose.model('Anima', animeSchema);

module.exports = Anime;