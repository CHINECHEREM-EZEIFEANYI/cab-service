const adminSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    email: String,
    phoneNumber: Number,
    password: String,
}, {
    timestamps: true
}
);