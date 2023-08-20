const { default: mongoose } = require("mongoose");
const adminSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    email: String,
    phoneNumber: Number,
    password: String,
})
 
exports.adminModel = mongoose.model('admin', adminSchema)