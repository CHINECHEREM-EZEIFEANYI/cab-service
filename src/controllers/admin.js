const mongoose = require('mongoose');

exports.addDriver = async function (req, res) {
    const { name, licenseNumber } = req.body;
    const driversCollection = db.collection('drivers');

        // Create a new driver document in the "drivers" collection
        driversCollection.insertOne({ name, licenseNumber }, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error adding driver' });
            }
            console.log(result.ops); // The inserted document
            res.redirect('/users'); // Redirect 
        });
};
exports.deleteDriver = function (req, res) {
    const driverId = req.params.driverId;
    const driversCollection = db.collection('drivers');
    // Delete the driver document with the given ID from the "drivers" collection
    driversCollection.deleteOne({ _id: ObjectId(driverId) }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting driver' });
        }
        console.log("Driver deleted sucessfully");
        res.redirect('/users'); // Redirect 
    })
};
exports.viewUser = function (req, res) {
    const usersCollection = db.collection('users');
    usersCollection.find({}).toArray((err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user accounts' });
        }
        return res.status(200).json(users);
    })
}
exports.viewDriver = function (req, res) {
    const driversCollection = db.collection('drivers');
    driversCollection.find({}).toArray((err, drivers) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching drivers accounts' });
        }
        return res.status(200).json(drivers);
 })
}
exports.getBookings = function (req, res) {
    const bookingsCollection = db.collection('bookings');
    // Retrieve booking information from the "bookings" collection
    bookingsCollection.find({}).toArray((err, bookings) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching bookings' });
        }
        return res.status(200).json(bookings);
    })
}
