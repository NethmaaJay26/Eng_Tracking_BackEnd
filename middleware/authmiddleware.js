import jwt from 'jsonwebtoken';
import Engineer from '../models/engineerModel.js';

const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Engineer.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        console.error('Something went wrong with authentication:', err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export { authenticateUser };
