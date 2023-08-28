const mongoose = require("mongoose");
const { DriverStatus } = require("../config/enum");

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  LastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1000,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  driverStatus: {
    type: String, enum : Object.values(DriverStatus), default : DriverStatus.PENDING
},
  phoneNumber: {
    type: String,
    required: false
  },
  age: Date,
  bio: String,
  car: Object,
  availability: Boolean,
  rating: Object,
  currentlocation: Object,

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
