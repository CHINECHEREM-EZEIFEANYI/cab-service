const { addDriver, deleteDriver, viewUser, viewDriver, getBookings } = require('../controllers/admin')
const express = require("express");
const adminrouter = express.Router();
const { authUser, authRole } = require("../basicAuth")



//adding new driver
adminrouter.post('/new', addDriver);

//deleting to-do from the list
adminrouter.delete('/delete/:id',  deleteDriver)

//rendering userpages
adminrouter.get('/viewuser',  viewUser);

//viewing drivers in the db
adminrouter.get('/viewdriver',  viewDriver);
//viewing bookings in the db
adminrouter.get('/getBookings', getBookings);


module.exports = {adminrouter}