const { approvedDriver, deleteDriver, getAllBookedRides, getUser, registerAdmin } = require('../controllers/admin')
const express = require("express");
const adminrouter = express.Router();
adminrouter.use(express.json());
const { isAdmin } = require('../middleware/auth')

adminrouter.post('/register', isAdmin, registerAdmin )
adminrouter.post('/new', isAdmin, approvedDriver);
adminrouter.delete('/delete/:id', isAdmin, deleteDriver)
adminrouter.get('/getuser', getUser);
adminrouter.get('/getuser', isAdmin, getAllBookedRides);


module.exports = adminrouter