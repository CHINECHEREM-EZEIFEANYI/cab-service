const express = require('express');
const urouter = express.Router();
const validatorMiddleware = require('../middleware/validationmiddleware')
const AuthValidator = require('../validators/authvalidator')
const {authUser, authRole} = require("../basicAuth")
const { registerUser, ResetPassword, UpdatePassword } = require ('../controllers/controller')


urouter.get("/users/dashboard", (req, res) => {
    res.render("dashboard", { user: req.user.name });
});

urouter.post(
    "/users/register", 
    validatorMiddleware(AuthValidator.Registerschema, "body"),
    registerUser
);

urouter.post(
    "/users/login",
    validatorMiddleware(AuthValidator.Loginschema, "body"),
    LoginUser
)

// Endpoint for requesting a cab booking
urouter.post('/booking', authUser, (req, res) => {
    const { origin, destination, passengerCount } = req.body;

    res.json({ message: 'Booking request received' });
});

// Endpoint for canceling a cab booking
urouter.post('/booking/:id/cancel', authUser, (req, res) => {
    const bookingId = req.params.id;

    res.json({ message: `Booking ${bookingId} canceled` });
});

// Endpoint for updating a cab booking
urouter.put('/booking/:id', authUser, (req, res) => {
    const bookingId = req.params.id;
    const { origin, destination, passengerCount } = req.body;

    res.json({ message: `Booking ${bookingId} updated` });
});

// Endpoint for retrieving details of a specific booking
urouter.get('/booking/:id', authUser, (req, res) => {
    const bookingId = req.params.id;
    res.json({ id: bookingId, origin: '...', destination: '...', passengerCount: '...' });
});

//reset password routes
urouter.get("/users/passwordreset", (req, res) => {
    res.render("passwordreset");
});
urouter.get("/users/logout", (req, res) => {
    req.logOut();
    req.flash("success_msg", "you have logged out");
    res.redirect("/users/login");
});
urouter.post("/users/passwordreset", ResetPassword)

/*router.get("/users/newpasswordpage", (req, res) => {
    res.render("newpasswordpage", { token: req.query.token }
    );
})
router.post("/users/newpasswordpage", UpdatePassword);*/

module.exports =  urouter 
