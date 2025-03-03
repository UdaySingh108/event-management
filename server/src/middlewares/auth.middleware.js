import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
export const restrictGuest = (req, res, next) => {
    if (req.user?.role === 'guest') {
      return res.status(403).json({ message: 'Guests are not allowed to perform this action' });
    }
    next();
  };
export default authMiddleware;