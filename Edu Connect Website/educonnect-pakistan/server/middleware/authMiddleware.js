const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
require('dotenv').config();

const protectTutor = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select('-password');
            if (!user || user.role !== 'tutor') {
                return res.status(403).json({ message: 'Access denied. Not a tutor.' });
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

module.exports = { protectTutor };
