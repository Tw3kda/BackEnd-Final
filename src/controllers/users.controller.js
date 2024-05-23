require('dotenv').config();
import User from '../models/Users';
import jwt from 'jsonwebtoken'

export const addUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: 'Username is already taken' });
            } else if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email is already registered' });
            }
        }

        // Encrypt the password before saving
        const hashedPassword = await User.encrypt(password);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        // Sign the JWT token with the user's ID
        const token = jwt.sign({ id: savedUser._id }, process.env.ACCESS_TOKEN_TOPSECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(201).json({ token, user: savedUser });

    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
};




export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await User.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Sign the JWT token with the user's ID
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_TOPSECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).json({ token, user });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
