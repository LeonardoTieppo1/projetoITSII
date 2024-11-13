const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js');


router.post('/register', authController.register);


router.post('/login', authController.login);


router.get('/user/:id', authController.getUser);

router.get('/protected', authenticateToken, authController.protectedRoute);

router.post('/user/update_password', authController.updatePassword);

router.get('/check-username', authController.checkUsername); 


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
