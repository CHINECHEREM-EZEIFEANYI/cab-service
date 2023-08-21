const { approvedDriver, deleteDriver, viewUser, viewDriver, getBookings } = require('../controllers/admin')
const express = require("express");
const adminrouter = express.Router();
const {  authRole } = require("../basicAuth")



//adding new driver
adminrouter.post('/new', authRole, approvedDriver);

//deleting to-do from the list
adminrouter.delete('/delete/:id', authRole, deleteDriver)

//rendering userpages
adminrouter.get('/viewuser', authRole, viewUser);

//viewing drivers in the db
adminrouter.get('/viewdriver', authRole,  viewDriver);
//viewing bookings in the db
adminrouter.get('/getBookings', authRole, getBookings);


module.exports = adminrouter