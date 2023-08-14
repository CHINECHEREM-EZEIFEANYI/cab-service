require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const session = require('express-session');
const { v4: uuidv4 } = require('uuid'); 

app.use(session({
    genid: function (req) {
        return uuidv4();
    },
    secret: process.env.SECRET ,
    resave: false,
    saveUninitialized: true,
}));
app.use(express.json());
app.use(bodyParser.json())
app.get("/", (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

