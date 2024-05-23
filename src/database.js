import mongoose from 'mongoose';

const dbUri = 'mongodb+srv://database:databaseks@daw-db.cxthcz2.mongodb.net/?retryWrites=true&w=majority&appName=DAW-DB://localhost:27017/database'
const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbUri);
        console.log('DB is connected');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

export default connectToDatabase;
