import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.statics.encrypt = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.statics.compare = async function(password, receivedPassword) {
    return bcrypt.compare(password, receivedPassword);
};

const User = mongoose.model('User', userSchema);

export default User;
