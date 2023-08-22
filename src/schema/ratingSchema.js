const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema(
    {
        driver: { type: mongoose.Schema.ObjectId.ObjectId, ref: "user" },
        passenger: { type: mongoose.Schema.ObjectId.ObjectId, ref: "user" },
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