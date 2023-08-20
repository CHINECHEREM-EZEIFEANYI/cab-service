require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const session = require('express-session');
const { authUser, authRole } = require ("./src/basicAuth")
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
app.use("/api/admin", require("./src/routes/adminRoute"));
app.use("/api/driver", require("./src/routes/driverRoute"));
app.use("/api/users", require("./src/routes/userRoute"));





app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

