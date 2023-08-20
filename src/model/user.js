const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    id: String,
    FirstName: String,
    LastName: String,
    email: String,
    phoneNumber: Number,
    age: Date,
    bio: String,
    car: Object,
    availability: Boolean,
    rating: Object,
    currentlocation: Object,
    dateCreated: Date,
    updateDate: Date
});
exports.userModel = mongoose.model('user', userSchema);
