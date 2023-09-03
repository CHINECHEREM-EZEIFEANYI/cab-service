const express = require("express");
const router = express.Router();
const {CancelRide, getCab} = require ('../controllers/ride')


router.get("/dashboard",);
router.post('/booking', getCab)
router.put('/booking/:id/cancel',  CancelRide);
router.get('/booking/:id',);


module.exports = router;
