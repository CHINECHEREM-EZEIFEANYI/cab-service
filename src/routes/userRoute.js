const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require("passport");
const {authUser, authRole} = require('.../basicAuth')
const { registerUser, ResetPassword, UpdatePassword } = require ('../controllers/controller')

router.get("/", (req, res) => {
    res.render("index");
});
router.get("/users/register", (req, res) => {
    res.render("register");
});
router.get("/users/login", (req, res) => {
    res.render("login");
});

router.get("/users/dashboard", (req, res) => {
    res.render("dashboard", { user: req.user.name });
});

router.post("/users/register", registerUser, (req, res) => {
    if (err) {
        console.log(err);
        return res.status(500).json({ err });
    } else {
        res.render("login");
    }
});
router.post(
    "/users/login",
    passport.authenticate("local", {
        successRedirect: "/users/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
    })
);
// Endpoint for requesting a cab booking
router.post('/booking', authUser, (req, res) => {
    const { origin, destination, passengerCount } = req.body;

    res.json({ message: 'Booking request received' });
});

// Endpoint for canceling a cab booking
router.post('/booking/:id/cancel', authUser, (req, res) => {
    const bookingId = req.params.id;

    res.json({ message: `Booking ${bookingId} canceled` });
});

// Endpoint for updating a cab booking
router.put('/booking/:id', authUser, (req, res) => {
    const bookingId = req.params.id;
    const { origin, destination, passengerCount } = req.body;

    res.json({ message: `Booking ${bookingId} updated` });
});

// Endpoint for retrieving details of a specific booking
router.get('/booking/:id', authUser, (req, res) => {
    const bookingId = req.params.id;
    res.json({ id: bookingId, origin: '...', destination: '...', passengerCount: '...' });
});

//reset password routes
router.get("/users/passwordreset", (req, res) => {
    res.render("passwordreset");
});
router.get("/users/logout", (req, res) => {
    req.logOut();
    req.flash("success_msg", "you have logged out");
    res.redirect("/users/login");
});
router.post("/users/passwordreset", ResetPassword)

/*router.get("/users/newpasswordpage", (req, res) => {
    res.render("newpasswordpage", { token: req.query.token }
    );
})
router.post("/users/newpasswordpage", UpdatePassword);*/

module.exports = { router }
