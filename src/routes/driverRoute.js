const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Sample data for drivers
let drivers = [
    { id: 1, name: 'John Doe', available: true },
    { id: 2, name: 'Jane Smith', available: false },
    { id: 3, name: 'Michael Johnson', available: true }
];

// Get all drivers
route.get('/drivers', (req, res) => {
    res.json(drivers);
});

// Get a single driver by ID
route.get('/drivers/:id', (req, res) => {
    const driverId = parseInt(req.params.id);
    const driver = drivers.find(driver => driver.id === driverId);

    if (!driver) {
        res.status(404).json({ error: 'Driver not found' });
    } else {
        res.json(driver);
    }
});

// Create a new driver
route.post('/drivers', (req, res) => {
    const { id, name } = req.body;
    const newDriver = { id, name, available: true };
    drivers.push(newDriver);

    res.status(201).json(newDriver);
});

// Update a driver's availability
route.put('/drivers/:id', (req, res) => {
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
route.delete('/drivers/:id', (req, res) => {
    const driverId = parseInt(req.params.id);
    const index = drivers.findIndex(driver => driver.id === driverId);

    if (index === -1) {
        res.status(404).json({ error: 'Driver not found' });
    } else {
        const deletedDriver = drivers.splice(index, 1);
        res.json(deletedDriver[0]);
    }
});


