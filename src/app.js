require('dotenv').config()
const express = require('express')
const app = express()

const animeRouter = require('./resources/anime/anime.route');

app.use(express.json())

app.use('/', (req, res, next) => {
    if(req.originalUrl === '/') {
        res.json({ message: 'Service is running!'})
        return
    }
    next()
})

app.use('/anime', animeRouter);


module.exports = app;