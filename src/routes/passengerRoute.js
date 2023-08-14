const express = require('express');
const router = express.Router();
const {authUser, authRole} = require('.../basicAuth')


router.get("/", function (req, res) {
    res.render('index')
});

router.get("/signUp", function (req, res) {
    res.render('page.jsx')
});
router.get("/login", function (req, res) {
    res.render('login')
});
router.get("/booking/dashboard", authUser, function (req, res) {
    res.render('studentdashboard', { user: req.user.name })
})
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

module.exports = {router}