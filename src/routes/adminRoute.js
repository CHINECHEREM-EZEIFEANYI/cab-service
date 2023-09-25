const express = require("express");
const adminrouter = express.Router();
adminrouter.use(express.json());
const { isAdmin } = require('../middleware/auth.js')
const { approvedDriver, deleteDriver, getAllBookedRides, getUser, registerAdmin } = require('../controllers/admin.js')

adminrouter.post('/register', isAdmin, registerAdmin);
adminrouter.post('/new', approvedDriver);
adminrouter.delete('/delete', deleteDriver)
adminrouter.get('/getuser/:id', getUser);
adminrouter.get('/getusers', getAllBookedRides);


module.exports = adminrouter