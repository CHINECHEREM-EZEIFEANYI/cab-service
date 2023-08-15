require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const session = require('express-session');
const { v4: uuidv4 } = require('uuid'); 
const apiKey = process.env.API_KEY;


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

res.send(`
<html>

<head>
    <title>Google Maps Integration</title>
    <script src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places"></script>
</head>

<body>
    <div id="map" style="width: 100%; height: 400px;"></div>
    <script src="script.js"></script>
</body>

</html>
`)

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

