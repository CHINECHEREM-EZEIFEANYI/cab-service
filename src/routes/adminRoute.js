const { addDriver, deleteDriver, viewUser, viewDriver, ViewBookings } = require('../controllers/admin')
const express = require("express");
const adminrouter = express.Router();



//adding new driver
adminrouter.post('/new', checkAuthenticated, addDriver);

//deleting to-do from the list
adminrouter.delete('/delete/:id', checkAuthenticated, deleteDriver)

//rendering userpages
adminrouter.get('/viewuser', checkAuthenticated, viewUser);

//viewing drivers in the db
adminrouter.get('/viewdriver', checkAuthenticated, viewDriver);
//viewing bookings in the db
adminrouter.get('/viewbookings', checkAuthenticated, ViewBookings);

function checkAuthenticated(req, res, next) {
    if (req.user) {
        next();
    }

    else {
        req.flash('success_msg', 'You need to be authenticated to access this page');
        res.redirect("/users/login");

    }
}

module.export = adminrouter