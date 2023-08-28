const mongoose = require("mongoose");
const { BookingStatus } = require("../config/enum");
const { JourneyStatus } = require("../config/enum");
const rideSchema = new mongoose.Schema(
    {
        driver: { type: mongoose.Schema.ObjectId.ObjectId, ref: "User" },
        passenger: { type: mongoose.Schema.ObjectId.ObjectId, ref: "User" },
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
        bookingStatus :{
        type: String, enum: Object.values(BookingStatus)
        },
        journeyStatus: {
            type: String, enum: Object.values(JourneyStatus)
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Ride', rideSchema);



