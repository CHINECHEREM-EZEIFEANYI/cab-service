require("dotenv").config();
const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const morgan = require('morgan');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);



app.use(morgan('tiny'))
app.use(
    session({
        genid: function (req) {
            return uuidv4();
        },
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/admin", require("./src/routes/adminRoute"));
app.use("/api/driver", require("./src/routes/driverRoute"));
app.use("/api/users", require("./src/routes/userRoute"));


app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydatabase';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the server
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected successfully to MongoDB');


  client.close();
});



