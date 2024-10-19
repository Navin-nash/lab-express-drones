const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');

// List all drones
router.get('/drones', async (req, res) => {
    try {
        const drones = await Drone.find();
        res.render('drones/list.hbs', { drones });
    } catch (error) {
        console.error('Error fetching drones:', error);
    }
});

// Show form to create a drone
router.get('/drones/create', (req, res) => {
    res.render('drones/create-form.hbs');
});

// Create a new drone
router.post('/drones/create', async (req, res) => {
    const { name, propellers, maxSpeed } = req.body;
    try {
        await Drone.create({ name, propellers, maxSpeed });
        res.redirect('/drones');
    } catch (error) {
        console.error('Error creating drone:', error);
        res.render('drones/create-form.hbs', { error });
    }
});

// Show form to edit a drone
router.get('/drones/:id/edit', async (req, res) => {
    try {
        const drone = await Drone.findById(req.params.id);
        res.render('drones/update-form.hbs', { drone });
    } catch (error) {
        console.error('Error fetching drone for edit:', error);
    }
});

// Update a drone
router.post('/drones/:id/edit', async (req, res) => {
    const { name, propellers, maxSpeed } = req.body;
    try {
        await Drone.findByIdAndUpdate(req.params.id, { name, propellers, maxSpeed });
        res.redirect('/drones');
    } catch (error) {
        console.error('Error updating drone:', error);
        res.render('drones/update-form.hbs', { error });
    }
});

// Delete a drone
router.post('/drones/:id/delete', async (req, res) => {
    try {
        await Drone.findByIdAndDelete(req.params.id);
        res.redirect('/drones');
    } catch (error) {
        console.error('Error deleting drone:', error);
    }
});

module.exports = router;
