const express = require("express");
const router = express.Router();

const { isUser } = require("../middleware/auth")
const { LoginUser, RegisterUser, Bookride, RateRide, CancelRide } = require("../controllers/user")


router.get("/dashboard",);

router.post("/register", RegisterUser);
router.post("/login", isUser, LoginUser);

// Endpoint for canceling a cab booking
router.put('/booking/:id/cancel', isUser, CancelRide);

// Endpoint for retrieving details of a specific booking
router.get('/booking/:id',);

module.exports = router;
