const express = require('express');
const router = express.Router();
const { authUser, authRole } = require("../basicAuth")
const {registerUser, ResetPassword, updatePassword} = require("../controllers/controller")
const passport = require("../passportconfig")

router.get("/", function (req, res) {
    res.render('index')
});

router.get("/signUp", function (req, res) {
    res.render('page.jsx')
});
router.get("/login", function (req, res) {
    res.render('login')
});
router.get("/driver/dashboard", authUser, function (req, res) {
    res.render('driverdashboard', { user: req.user.name })
})
router.post("/driver/register", registerUser, (req, res) => {
    if (err) {
        console.log(err);
        return res.status(500).json({ err });
    } else {
        res.render("login");
    }
});
// router.post(
//     "/driver/login",
//     passport.authenticate("local", {
//         successRedirect: "/driver/dashboard",
//         failureRedirect: "/driver/login",
//         failureFlash: true,
//     })
// );
router.get('/booking/:id', authUser, (req, res) => {
    const bookingId = req.params.id;
    res.json({ id: bookingId, origin: '...', destination: '...', passengerCount: '...' });
});

//reset password routes
router.get("/driver/passwordreset", (req, res) => {
    res.render("passwordreset");
});
router.get("/driver/logout", (req, res) => {
    req.logOut();
    req.flash("success_msg", "you have logged out");
    res.redirect("/users/login");
});
router.post("/driver/passwordreset", ResetPassword)

module.exports = { router}
