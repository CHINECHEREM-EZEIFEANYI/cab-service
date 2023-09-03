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

exports.CancelRide = async (req, res) => {
    const { email, password, rideId } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).send('Invalid Email or Password');
        }

        const isValid = await bcryptjs.compare(password, user.password);

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

// exports.Bookride = async (req, res) => {
//     const { driverId, passengerId, origin, destination } = req.body
//     try {
//         const driver = await User.findById(driverId);
//         const passenger = await User.findById(passengerId);
//         if (!driver || !passenger) {
//             return res.status(404).send('Driver or passenger not found');
//         }

//         const newRide = new ride({
//             driver: driverId,
//             passenger: passengerId,
//             origin,
//             destination
//         });
//         await newRide.save();
//         res.status(201).send('Ride booked successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while booking the ride');
//     }
// }
exports.RateRide = async (req, res) => {
    const { email, password, rideId, stars, feedback } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).send('Invalid Email or Password');
        }

        const isValid = await bcryptjs.compare(password, user.password);

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



