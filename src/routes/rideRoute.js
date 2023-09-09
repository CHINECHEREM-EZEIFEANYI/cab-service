const express = require("express");
const router = express.Router();
const {CancelRide, getCab, RateRide} = require ('../controllers/ride')


router.get("/dashboard",);
router.post('/booking', getCab)
router.put('/booking/:id/cancel',  CancelRide);
router.post('/booking/:id', RateRide);


module.exports = router;
