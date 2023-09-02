const mongoose = require("mongoose");
const { BookingStatus } = require("../config/enum");
const { JourneyStatus } = require("../config/enum");
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
        travelDate: { type: Date }, 
        bookingStatus :{
        type: String, enum: Object.values(BookingStatus)
        },
        journeyStatus: {
            type: String, enum: Object.values(JourneyStatus)
        },
        rating: { type: Number, required: true,  min: 0, max: 5 },
        bookingId: { type: String, unique: true, required: true,  }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Ride', rideSchema);



