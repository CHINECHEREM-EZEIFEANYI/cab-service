const { Ride } = require('../schema/rideSchema.js');
const { v4: uuidv4 } = require("uuid")
const id = uuidv4();
console.log(id);

exports.getCab = async (req, res) => {

    try {
        // Check if booking is available
        const existingBooking = await Ride.findOne({ bookingId: id });

        if (existingBooking) {
            res.status(400).json({ error: "Booking is already made" });
            return;
        }

       
        // Create a new booking
        const {
            passenger, driver, pickUpLocation, destination, amount, travelDate,  bookingStatus,  journeyStatus, review, ratingd } = req.body;

        const newRide = await Ride.create({
            passenger,
            driver,
            pickUpLocation,
            destination,
            amount,
            travelDate,
            bookingStatus,
            journeyStatus,
            review,
            rating,
            bookingId : id
        });


        if (!newRide) {
            res.status(500).json({ error: "Error trying to book cab" });
            return;
        }

        res.status(201).json(newRide);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Errorsss" });
    }
};


