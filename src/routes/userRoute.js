const express = require('express');
const urouter = express.Router();
const { LoginUser, RegisterUser, ResetPassword, UpdatePassword , InputPassword} = require("../controllers/user")



urouter.get("/dashboard",);
urouter.post("/register", RegisterUser);
urouter.post("/login", LoginUser);
urouter.get('/booking/:id',);
urouter.post("/passwordreset", ResetPassword)
urouter.post("/updatepassord", UpdatePassword)
urouter.post("/inputpassword", InputPassword)
urouter.get("/logout",)

module.exports = urouter
