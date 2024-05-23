const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://database:databaseks@daw-db.cxthcz2.mongodb.net/?retryWrites=true&w=majority&appName=DAW-DB');
        console.log('Connected to database');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

module.exports = connectToDatabase;
