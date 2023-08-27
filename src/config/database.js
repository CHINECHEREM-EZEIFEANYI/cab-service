require("dotenv").config();
const mongoose = require('mongoose')

const connectDB = async (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Databse connected successfully ')
    }).catch((err) => {
        console.error(`Error connecting to the database.`, err.message)
    });

}

module.exports = { connectDB }
    
