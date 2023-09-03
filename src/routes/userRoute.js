const express = require('express');
const bodyParser = require('body-parser');
const urouter = express.Router();

const { LoginUser, RegisterUser, ResetPassword, UpdatePassword } = require("../controllers/user")



urouter.get("/dashboard",);

urouter.post("/register", RegisterUser);
urouter.post("/login", LoginUser);
// Endpoint for retrieving details of a specific booking
urouter.get('/booking/:id',);

//reset password routes
urouter.get("/passwordreset", ResetPassword)
urouter.get("/logout",)
urouter.post("/passwordreset", ResetPassword)
urouter.post ("/updatepassord", UpdatePassword)


module.exports = urouter
