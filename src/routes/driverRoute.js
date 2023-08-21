const express = require("express");
const router = express.Router();

const passport = require("../passportconfig");

router.get("/index", function (req, res) {
  res.render("index");
});

router.get("/signUp", function (req, res) {
  res.render("signUp");
});
router.get("/login", function (req, res) {
  res.render("login");
});
router.get("/dashboard",  function (req, res) {
  res.render("driverdashboard", { user: req.user.name });
});
router.post("/driver/register",  (req, res) => {
  if (err) {
    console.log(err);
    return res.status(500).json({ err });
  } else {
    res.render("login");
  }
});
// router.post(
//     /login",
//     passport.authenticate("local", {
//         successRedirect: "/driver/dashboard",
//         failureRedirect: "/driver/login",
//         failureFlash: true,
//     })
// );
router.get("/booking/:id",  (req, res) => {
  const bookingId = req.params.id;
  res.json({
    id: bookingId,
    origin: "...",
    destination: "...",
    passengerCount: "...",
  });
});

//reset password routes
router.get("/passwordreset", (req, res) => {
  res.render("passwordreset");
});
router.get("/logout", (req, res) => {
  //req.logOut();
  // req.flash("success_msg", "you have logged out");
  res.redirect("/login");
  console.log("test");
});
router.post("/passwordreset");

module.exports = router;
