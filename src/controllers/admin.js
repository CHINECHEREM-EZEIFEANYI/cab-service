const { DriverStatus } = require('../config/enum');
const  user = require('../model/user');

const mongoose = require('mongoose');

exports.approvedDriver = async function (req, res) {
    const { approved, driverId } = req.body;
    const isExist = await user.findById(driverId);

    if (!isExist) {
        return res.status(500).json({ message: 'Error adding driver' });
    }

    let status; 

    if (approved) {
        status = DriverStatus.APPROVED; 
    } else {
        status = DriverStatus.REJECTED; 
    }

    const driver = await user.updateOne({ _id: driverId }, { isDriverApproved: approved, driverStatus: status });
    return res.status(200).json({ message: 'Driver added successfully' });
};

exports.deleteDriver = async function (req, res) {
    const driverId = req.params.driverId;
    const user = await user.findById(driverId);
    if (!user) {
        return res.status(500).json({ message: 'User Not Found' });
    }
    else {
       userModel.deleteOne({ _id: driverId }, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting driver' });
            }
           return res.status(200).json({ message: 'Driver deleted successfully' });
            
        });
}
   
};

exports.viewUser = async function (req, res) {
    await user.find({}).toArray((err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user accounts' });
        }
        return res.status(200).json(users);
    })
}
exports.viewDriver = async function (req, res) {
    await user.find({}).toArray((err, drivers) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching drivers accounts' });
        }
        return res.status(200).json(drivers);
 })
}
exports.getBookings = async function (req, res) {

    await user.find({}).toArray((err, bookings) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching bookings' });
        }
        return res.status(200).json(bookings);
    })
}
