const mongoose = require('mongoose');
const { DriverStatus } = require('../config/enum');
const User = require("../schema/driver-schema")


exports.approvedDriver = async function (req, res) {
    const { approved, driverId } = req.body;
    const isExist = await User.findById(driverId);

    if (!isExist) {
        return res.status(500).json({ message: 'Error adding driver' });
    }

    let status; 

    if (approved) {
        status = DriverStatus.APPROVED; 
    } else {
        status = DriverStatus.REJECTED; 
    }

    const driver = await User.updateOne({ _id: driverId }, { isDriverApproved: approved, driverStatus: status });
    return res.status(200).json({ message: 'Driver added successfully' });
};

exports.deleteDriver = async function (req, res) {
    const driverId = req.params.driverId;
    const user = await User.findById(driverId);
    if (!user) {
        return res.status(500).json({ message: 'User Not Found' });
    }
    else {
       User.deleteOne({ _id: driverId }, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting driver' });
            }
           return res.status(200).json({ message: 'Driver deleted successfully' });
            
        });
}
   
};
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ _id: -1 });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
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


