const mongoose = require('mongoose');

const connect = runServer => {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', () => {
        console.log('we are connected')
        runServer()
    })
}

module.exports = { connect }