//const { Ride } = require('../schema/rideSchema.js');
const Ride = require ('../schema/rideSchema.js')
const User = require('../schema/driver-schema.js')
const { v4: uuidv4 } = require("uuid")
const bcryptjs = require('bcryptjs')
const genAuthToken = require("../utils/genAuthToken")

exports.getCab = async (req, res) => {
   
        const { passenger, driver, pickUpLocation, destination, amount, travelDate, bookingStatus, email, journeyStatus, review,} = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (!user) return res.status(400).send(" Invalid Email ");
        const newBookingId = uuidv4();
        const existingBooking = await Ride.findOne({ bookingId : newBookingId });

        if (existingBooking) {
            return res.status(400).json({ error: "Booking is already made" });
        }

        const newRide = await Ride.create({
            passenger, driver, pickUpLocation,
            destination, amount, travelDate,
            bookingStatus, email, journeyStatus, review,
            bookingId: newBookingId,
        });

        if (!newRide) {
            return res.status(500).json({ error: "Error trying to book cab" });
        }

        return res.status(201).json(newRide);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.CancelRide = async (req, res) => {
    const { email, password, id } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).send('User not found. Please check your email.');
        }

        if (!password) {
            return res.status(400).send('Invalid Password');
        }

        const isValid = await bcryptjs.compare(password, user.password);

        if (!isValid) {
            return res.status(400).send('Incorrect password. Please verify your password.');
        }
        const token = genAuthToken(user);
        const ride = await Ride.findById(id);

        if (!ride) {
            return res.status(404).send('Ride not found. Please provide a valid booking ID.');
        }
        // Cancel the ride
        ride.status = 'cancelled';
        await ride.save();

        res.send({ token , message : "Ride cancelled successfully"});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while cancelling the ride. Please try again later.');
    }
};


exports.RateRide = async (req, res) => {
    const { email, password, id, stars, feedback } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).send('Email not found');
        }

        const isValid = await bcryptjs.compare(password, user.password);

        if (!isValid) {
            return res.status(400).send('Invalid Email or Password');
        }
        const token = genAuthToken(user);

        const ride = await Ride.findById(id);

        if (!ride) {
            return res.status(404).send('Ride not found');
        }

        ride.stars = stars;
        ride.feedback = feedback;
        await ride.save();
        const response = {
            token: token,
            ride: ride,
            requestBody: req.body, 
        };

        res.send(response)
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while rating the ride');
    }
};



