const mongoose = require("mongoose");
const { JourneyStatus, BookingStatus } = require("../config/enum");
const {User} = require ('./driver-schema')
const rideSchema = new mongoose.Schema(
    {
        driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        passenger: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        pickupLocation: {
            longitude: String,
            latitude: String,
            address: String,
        },
        destination: {
            longitude: String,
            latitude: String,
            address: String,
        },
        email: {
            type: String,
            required: false,
            minlength: 10,
            maxlength: 60,
            unique: true,
        },
        travelDate: { type: Date }, 
        bookingStatus: {
    type: String,
            enum: Object.values(BookingStatus),
    trim: true
  },
        journeyStatus: {
            type: String, enum: Object.values(JourneyStatus)
        },
        rating: { type: Number, required: false,  min: 0, max: 5 },
        bookingId: { type: String, unique: true, required: true,  }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Ride', rideSchema);



