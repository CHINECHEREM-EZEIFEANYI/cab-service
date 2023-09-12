const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phoneNumber: Number,
    role: {
        type: String,
        default: 'admin',
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model("Admin", adminSchema);