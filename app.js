const express = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');
const dronesRouter = require('./routes/drones');

const app = express();

// Database connection
const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/drone-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', dronesRouter);

const PORT = process.env.PORT || 3000;

dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
