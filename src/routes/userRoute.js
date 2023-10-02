const express = require('express');
const urouter = express.Router();
const { LoginUser, RegisterUser, ResetPassword, UpdatePassword } = require("../controllers/user")



urouter.get("/dashboard",);
urouter.post("/register", RegisterUser);
urouter.post("/login", LoginUser);
urouter.get('/booking/:id',);
urouter.post("/passwordreset", ResetPassword)
urouter.get("/logout",)
urouter.post("/newpasswordpage", ResetPassword)
urouter.post ("/updatepassord", UpdatePassword)


module.exports = urouter
