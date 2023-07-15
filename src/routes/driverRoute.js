const express = require('express');
const bodyParser = require('body-parser');
const {authUser, authRole } = require('.../basicAuth')
const app = express();
app.use(bodyParser.json());

// Sample data for drivers
let drivers = [
    { id: 1, name: 'John Doe', available: true },
    { id: 2, name: 'Jane Smith', available: false },
    { id: 3, name: 'Michael Johnson', available: true }
];
router.get("/", function (req, res) {
    res.render('index')
});

router.get("/signIn", function (req, res) {
    res.render('signup')
});
router.get("/login", function (req, res) {
    res.render('login')
});

// Get all drivers
route.get('/drivers', (req, res) => {
    res.json(drivers);
});

// Get a single driver by ID
route.get('/drivers/:id', authUser, (req, res) => {
    const driverId = parseInt(req.params.id);
    const driver = drivers.find(driver => driver.id === driverId);

    if (!driver) {
        res.status(404).json({ error: 'Driver not found' });
    } else {
        res.json(driver);
    }
});

// Create a new driver
route.post('/drivers', authUser, (req, res) => {
    const { id, name } = req.body;
    const newDriver = { id, name, available: true };
    drivers.push(newDriver);

    res.status(201).json(newDriver);
});

// Update a driver's availability
route.put('/drivers/:id', authUser, (req, res) => {
    const driverId = parseInt(req.params.id);
    const driver = drivers.find(driver => driver.id === driverId);

    if (!driver) {
        res.status(404).json({ error: 'Driver not found' });
    } else {
        driver.available = req.body.available;
        res.json(driver);
    }
});

// Delete a driver
route.delete('/drivers/:id', authRole, (req, res) => {
    const driverId = parseInt(req.params.id);
    const index = drivers.findIndex(driver => driver.id === driverId);

    if (index === -1) {
        res.status(404).json({ error: 'Driver not found' });
    } else {
        const deletedDriver = drivers.splice(index, 1);
        res.json(deletedDriver[0]);
    }
});


