import connectToDatabase from './database';
import dotenv from 'dotenv';

dotenv.config();

const express = require('express');
const app = express();


const postRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');


app.use(express.json());


app.use('/posts', postRoutes); 
app.use('/users', usersRoutes);  


// Root route
app.get('/', (req, res) => {
    res.send('WELCOME TO MY FINAL PROJECT API ------ NAVARRO-MORENO');
});

connectToDatabase();

module.exports = app;