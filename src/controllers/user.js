const mongoose = require('mongoose');
const User = require('../schema/driver-schema'); // Import the schema
const {ride, rating, } = require ('../schema/driver-schema')
const bcrypt = require("bcrypt");
const genAuthToken = require("../utils/genAuthToken")


exports.LoginUser = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).send(" Invalid Email or Password ");
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send(" Invalid Email or Password ");
    const token = genAuthToken(user);
    res.send(token);
};
exports.RegisterUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send(" User with this email exist... ");

    const { FirstName, LastName, email, password , phonenumber } = req.body;

    user = new User({
        FirstName: FirstName,
        LastName: LastName,
        email: email,
        password: password,
        phonenumber: phonenumber 
        
    });
    user.password = await bcrypt.hash(user.password, 10);
    user = await user.save();
    const token = genAuthToken(user);
    res.send(token);
};
exports.Bookride = async (req, res) => {
    const {driverId, passengerId, origin, destination} = req.body
try {
    const driver = await User.findById(driverId);
    const passenger = await User.findById(passengerId);
if (!driver || !passenger) {
    return res.status(404).send('Driver or passenger not found');
    }
    
const newRide = new ride({
    driver: driverId,
    passenger: passengerId,
    origin,
   destination
});
    await newRide.save();
res.status(201).send('Ride booked successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while booking the ride');
}
}
exports.RateRide = async (req, res) => {
    const { email, password, rideId, stars, feedback } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).send('Invalid Email or Password');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).send('Invalid Email or Password');
        }
        const token = genAuthToken(user);

        const ride = await ride.findById(rideId);

        if (!ride) {
            return res.status(404).send('Ride not found');
        }

        ride.stars = stars;
        ride.feedback = feedback;
        await ride.save();

        res.send(token);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while rating the ride');
    }
};
exports.CancelRide = async (req, res) => {
    const { email, password, rideId } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).send('Invalid Email or Password');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).send('Invalid Email or Password');
        }
        const token = genAuthToken(user);
        const ride = await ride.findById(rideId);

        if (!ride) {
            return res.status(404).send('Ride not found');
        }
        // Cancel the ride
        ride.status = 'cancelled';
        await ride.save();

        res.send(token);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while cancelling the ride');
    }
};