const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function generateToken(user) {
    return jwt.sign(
        { id: user.id, role: user.role }, 
        jwtSecret, 
        { expiresIn: '1h' }
    );
}

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });

        req.user = user;
        next();
    });
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            console.log(req.user, role)
            return res.status(403).json({ message: 'Access Forbidden' });
        }
        next();
    };
}

module.exports = { generateToken, authenticateToken, authorizeRole };
