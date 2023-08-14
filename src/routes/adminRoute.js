const { addDriver, deleteDriver, viewUser, viewDriver, ViewBookings } = require('../controllers/admin')
const express = require("express");
const adminrouter = express.Router();
const { authUser, authRole } = require('.../basicAuth')



//adding new driver
adminrouter.post('/new', authRole, addDriver);

//deleting to-do from the list
adminrouter.delete('/delete/:id', authRole, deleteDriver)

//rendering userpages
adminrouter.get('/viewuser', authRole, viewUser);

//viewing drivers in the db
adminrouter.get('/viewdriver', authRole, viewDriver);
//viewing bookings in the db
adminrouter.get('/viewbookings', authRole, ViewBookings);


module.export = adminrouter