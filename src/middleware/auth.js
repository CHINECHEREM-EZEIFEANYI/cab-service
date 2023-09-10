require("dotenv").config();
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const token = req.header("X-auth-token");
    if (!token) return res.status(401).send("Access denied, Not authenticated");

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = jwt.verify(token, secretKey);
        req.user = user;
        next();
    } catch (ex) {
        return res.status(400).send("Access denied, Invalid auth token");
    }
};

function isAdmin (req, res, next) {
    if (req.body && req.body.pin) {
        const { pin } = req.body
        const secretAdminkey = process.env.ADMIN_KEY
        if (pin === secretAdminkey) {
            next()
        } else {
            return res.status(400).json({ message: "Invalid PIN" });
        }
    } else {
        return res.status(400).json({ message: "Missing PIN in the request body" });; // 'pin' property is missing
    }
}
    
    
module.exports = { auth, isAdmin };