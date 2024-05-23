

import * as userCtrl from '../controllers/users.controller';
const authenticateToken = require('../middleware/authToken');

const express = require('express');
const router = express.Router();

router.post('/new-user', userCtrl.addUser);
router.post('/login', userCtrl.loginUser);



module.exports = router; 