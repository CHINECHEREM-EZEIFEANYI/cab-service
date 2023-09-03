const { approvedDriver, deleteDriver, getAllUsers, getUser } = require('../controllers/admin')
const express = require("express");
const adminrouter = express.Router();


adminrouter.post('/new', approvedDriver);
adminrouter.delete('/delete/:id', deleteDriver)
adminrouter.get('/getuser', getUser);
adminrouter.get('/getuser', getAllUsers);


module.exports = adminrouter