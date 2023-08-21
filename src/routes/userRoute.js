const express = require('express');
const bodyParser = require('body-parser');
const urouter = express.Router();
const passport = require("passport");

urouter.get("/index", (req, res) => {
    res.render("index");
});
urouter.get("/register", (req, res) => {
    res.render("register");
});
urouter.get("/login", (req, res) => {
    res.render("login");
});

urouter.get("/dashboard", (req, res) => {
    res.render("dashboard", { user: req.user.name });
});

urouter.post("/register",  (req, res) => {
    if (err) {
        console.log(err);
        return res.status(500).json({ err });
    } else {
        res.render("login");
    }
});
urouter.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/users/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
    })
);
// Endpoint for requesting a cab booking
urouter.post('/booking',  (req, res) => {
    const { origin, destination, passengerCount } = req.body;

    res.json({ message: 'Booking request received' });
});

// Endpoint for canceling a cab booking
urouter.post('/booking/:id/cancel',  (req, res) => {
    const bookingId = req.params.id;

    res.json({ message: `Booking ${bookingId} canceled` });
});

// Endpoint for updating a cab booking
urouter.put('/booking/:id',  (req, res) => {
    const bookingId = req.params.id;
    const { origin, destination, passengerCount } = req.body;

    res.json({ message: `Booking ${bookingId} updated` });
});

// Endpoint for retrieving details of a specific booking
urouter.get('/booking/:id',  (req, res) => {
    const bookingId = req.params.id;
    res.json({ id: bookingId, origin: '...', destination: '...', passengerCount: '...' });
});

//reset password routes
urouter.get("/passwordreset", (req, res) => {
    res.render("passwordreset");
});
urouter.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success_msg", "you have logged out");
    res.redirect("/login");
});
urouter.post("/passwordreset",)


module.exports =  urouter
