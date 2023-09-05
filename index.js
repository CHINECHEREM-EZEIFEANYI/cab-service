require('dotenv').config()
const express = require("express");
const bcryptjs = require('bcryptjs')
const { connectDB } = require('./src/config/database.js')
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const morgan = require('morgan');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
// console.log(secretKey)



app.use(morgan('tiny'))
app.use(
  session({
    genid: function (req) {
      return uuidv4();
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/admin", require("./src/routes/adminRoute"));
app.use("/api/ride", require("./src/routes/rideRoute.js"));
app.use("/api/users", require("./src/routes/userRoute.js"));

const url = process.env.DB_URL;

const start = async () => {
  await connectDB(url)

  app.listen(port, () => {
    console.log(`app running on port ${port}`);
  });
}

start()







