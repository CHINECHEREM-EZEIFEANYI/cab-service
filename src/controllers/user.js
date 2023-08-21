const user = require("../model/user")
const {ride, rating} = require ('../schema/driver-schema')
const bcrypt = require("bcrypt");
const genAuthToken = require("../utils/genAuthToken")
exports.getAllUsers = async (req, res) => {
    try {
        const users = await user.find().sort({ _id: -1 });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.getUser = async (req, res) => {
    try {
        const user = await user.findById(req.params.id);

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
exports.LoginUser = async (req, res) => {
    const { email, password } = req.body;
    let user = await user.findOne({ email: email });
    if (!user) return res.status(400).send(" Invalid Email or Password ");
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send(" Invalid Email or Password ");
    const token = genAuthToken(user);
    res.send(token);
};
exports.RegisterUser = async (req, res) => {
    let user = await user.findOne({ email: req.body.email });
    if (user) return res.status(400).send(" User with this email exist... ");

    const { name, email, password } = req.body;

    user = new User({
        name: name,
        email: email,
        password: password,
    });
    user.password = await bcrypt.hash(user.password, 10);
    user = await user.save();
    const token = genAuthToken(user);
    res.send(token);
};
exports.Bookride = async (req, res) => {
    const {driverId, passengerId, origin, destination} = req.body
try {
    const driver = await user.findById(driverId);
    const passenger = await user.findById(passengerId);
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

    // Assuming you have a function to generate an authentication token
    const token = genAuthToken(user);

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).send('Ride not found');
    }

    // Update ride with rating and feedback
    ride.stars = stars;
    ride.feedback = feedback;
    await ride.save();

    res.send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while rating the ride');
  }
    };

res.status(201).send('Ride booked successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while booking the ride');
}
}
exports.RateRide = async (req, res) => {
    const { email, password, rideId, stars, feedback } = req.body;

    try {
        const user = await user.findOne({ email: email });

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