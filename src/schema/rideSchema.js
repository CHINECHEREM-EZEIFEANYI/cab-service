const mongoose = require("mongoose");
const rideSchema = new mongoose.Schema(
    {
        driver: { type: mongoose.Schema.ObjectId.ObjectId, ref: "user" },
        passenger: { type: mongoose.Schema.ObjectId.ObjectId, ref: "user" },
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
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Ride', rideSchema);
