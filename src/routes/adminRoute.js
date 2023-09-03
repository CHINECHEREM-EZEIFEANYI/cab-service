const { approvedDriver, deleteDriver, getAllUsers, getUser } = require('../controllers/admin')
const express = require("express");
const adminrouter = express.Router();




//adding new driver
adminrouter.post('/new', approvedDriver);

//deleting driver from the list
adminrouter.delete('/delete/:id', deleteDriver)

adminrouter.get('/getuser', getUser);

adminrouter.get('/getuser', getAllUsers);


module.exports = adminrouter