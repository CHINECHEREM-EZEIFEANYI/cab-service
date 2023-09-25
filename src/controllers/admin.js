const mongoose = require('mongoose');
const { DriverStatus } = require('../config/enum');
const {BookingStatus } = require('../config/enum');
const Admin = require("../schema/admin-schema")
const User = require ('../schema/driver-schema')
const isLicenseNumberValid = require('../config/enum')
const { isAdmin } = require('../middleware/auth.js')

exports.registerAdmin= async function (req, res) {
    const { userName, password, email, pin } = req.body
    if (!userName || !password || !email || !pin) {
        return res.status(400).json({ message: "Missing or incomplete data in the request body" });
    }
    let user = await User.findOne({ email: email });
    if (user) return res.status(400).send("Email Already Exists");

    if (!isAdmin) {
        return res.status(403).json({  message: 'Invalid PINs' });
    } 
    const newAdmin = new Admin ({
        userName, password, email, role: 'admin'
    })
    await newAdmin.save()
    if (newAdmin) {
        res.status(201).json({ userName, email, message: 'Admin account created successfully' });
    }
    else {
        res.status(500).json({ message: 'Error creating admin account' });
    }
}

exports.approvedDriver = async function (req, res) {
    const { approved, driverId, licenseNumber } = req.body;
    const isExist = await User.findById(driverId);

    if (!isExist) {
        return res.status(500).json({ message: 'Error adding driver' });
    }

    let status; 

    if (approved && isLicenseNumberValid ) {
        status = DriverStatus.APPROVED; 
    } else {
        status = DriverStatus.REJECTED; 
    }

    const driver = await User.updateOne({ _id: driverId }, { isDriverApproved: approved, driverStatus: status });
    return res.status(200).json({ driver, message: 'Driver added successfully' });
};

exports.deleteDriver = async function (req, res) {
    const driverId = req.body;
    const user = await User.findById(driverId);
    if (!user) {
        return res.status(500).json({ message: 'User Not Found' });
    }
    else {
        User.deleteOne({ _id: driverId }, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting driver' });
            }
            return res.status(200).json({ message: 'Driver deleted successfully' });
            
        });
}
   
};
exports.getAllBookedRides = async (req, res) => {
    try {
        const bookedRides = await Ride.find({ bookingStatus: BookingStatus.ACCEPTED });
        res.status(200).json(bookedRides);
    } catch (error) {
        res.status(500).json({message: "Error Retrieving The Booked Rides"});
    }
};
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        //specifying to avoid sending the password
        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

