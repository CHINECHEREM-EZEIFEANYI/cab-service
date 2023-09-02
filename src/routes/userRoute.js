const express = require('express');
const bodyParser = require('body-parser');
const urouter = express.Router();
const passport = require("passport");
const {  isUser } = require("../middleware/auth")
const { LoginUser, RegisterUser, Bookride, RateRide, CancelRide } = require("../controllers/user")
const {getCab} =  require ('../controllers/ride')


urouter.get("/dashboard", );

urouter.post("/register", RegisterUser );
urouter.post("/login", LoginUser );
// Endpoint for requesting a cab booking
urouter.post('/booking', getCab );

// Endpoint for canceling a cab booking
urouter.put('/booking/:id/cancel', isUser, CancelRide );

// Endpoint for retrieving details of a specific booking
urouter.get('/booking/:id',);

//reset password routes
urouter.get("/passwordreset",)
urouter.get("/logout", )
urouter.post("/passwordreset",)


module.exports =  urouter
