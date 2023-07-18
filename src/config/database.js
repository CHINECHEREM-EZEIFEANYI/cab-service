//db.js
require('dotenv').config();
const mongoose = require('mongoose')

const url = `mongodb + srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vc86snd.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`)
    });