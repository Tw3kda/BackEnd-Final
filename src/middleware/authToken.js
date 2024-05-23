const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // If no token is present

    jwt.verify(token, process.env.ACCESS_TOKEN_TOPSECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid or expired

        req.user = user; // Store the user information in request object
        next(); // Call the next middleware or route handler
    });
}

module.exports = authenticateToken;
