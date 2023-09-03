const express = require("express");
const router = express.Router();
const {CancelRide, getCab} = require ('../controllers/ride')


router.get("/dashboard",);
// Endpoint for requesting a cab booking
router.post('/booking', getCab)


// Endpoint for canceling a cab booking
router.put('/booking/:id/cancel',  CancelRide);

// Endpoint for retrieving details of a specific booking
router.get('/booking/:id',);


module.exports = router;
