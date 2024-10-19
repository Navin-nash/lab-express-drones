const mongoose = require('mongoose');
const Drone = require('../models/Drone.model'); // Adjust the path if needed
const { dbConnection } = require('../db/index'); // Assuming you have a separate file to handle DB connection

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
];

const seedDrones = async () => {
    try {
        await dbConnection(); // Ensure to call your DB connection
        const createdDrones = await Drone.create(drones);
        console.log(`${createdDrones.length} drones created.`);
    } catch (error) {
        console.error('Error seeding drones:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDrones();
