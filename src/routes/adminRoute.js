const { approvedDriver, deleteDriver, viewUser, viewDriver, getBookings } = require('../controllers/admin')
const express = require("express");
const adminrouter = express.Router();




//adding new driver
adminrouter.post('/new', approvedDriver);

//deleting to-do from the list
adminrouter.delete('/delete/:id', deleteDriver)

adminrouter.get('/getBookings',  getBookings);


module.exports = adminrouter