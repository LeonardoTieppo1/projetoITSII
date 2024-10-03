const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Get user by ID
router.get('/user/:id', authController.getUser);

// Protected route
router.get('/protected', authenticateToken, authController.protectedRoute);

router.post('/user/update_password', authController.updatePassword);


// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, 'supersecretkey', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = router;
