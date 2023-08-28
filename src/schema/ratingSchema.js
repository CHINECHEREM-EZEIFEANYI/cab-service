const mongoose = require("mongoose");
const userModel = require ("./driver-schema")
const ratingSchema = new mongoose.Schema(
    {
        driver: { type: mongoose.Schema.ObjectId.ObjectId, ref: "User" },
        passenger: { type: mongoose.Schema.ObjectId.ObjectId, ref: "User" },
        stars: Number,
        review: {
            star: Number,
            feedback: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Rate", ratingSchema);