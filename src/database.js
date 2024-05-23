import mongoose from 'mongoose';

const dbUri = process.env.MONGODB_URI
const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbUri);
        console.log('DB is connected');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

export default connectToDatabase;
