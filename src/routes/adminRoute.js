const { approvedDriver, deleteDriver, viewUser, viewDriver, getBookings } = require('../controllers/admin')
const express = require("express");
const adminrouter = express.Router();




//adding new driver
adminrouter.post('/new', approvedDriver);

//deleting to-do from the list
adminrouter.delete('/delete/:id', deleteDriver)

//rendering userpages
adminrouter.get('/viewuser',  viewUser);

//viewing drivers in the db
adminrouter.get('/viewdriver',   viewDriver);
//viewing bookings in the db
adminrouter.get('/getBookings',  getBookings);


module.exports = adminrouter