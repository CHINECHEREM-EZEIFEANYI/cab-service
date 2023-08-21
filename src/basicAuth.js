function authUser(req, res, next) {
  if (req.user == null) {
    req.flash(
      "success_msg",
      "You need to be authenticated to access this page, Login"
    );
    res.redirect("/login");
    if (req.user.name == undefined) {
      return user;
    }
  }
  next();
}
function authRole(req, res, next) {
  console.log("req.user:", req.user); // Debugging line
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    req.flash(
      "success_msg",
      "Access denied, Login with Admin credentials to gain access"
    );
    res.redirect("/login");
  }
}


module.exports = { authUser, authRole };
