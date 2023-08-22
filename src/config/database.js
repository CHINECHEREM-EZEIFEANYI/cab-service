require("dotenv").config();
const mongoose = require('mongoose')

const url = process.env.DB_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => {
        console.log('Databse connected successfully ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database.`, err.message)
    });

    
