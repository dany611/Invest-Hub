const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
  
    if (!token) {
      return res.status(403).json({ msg: 'Access denied' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ msg: 'Invalid token' });
      }
  
      req.user = decoded.user; 
      next();
    });
  };

module.exports = authenticateJWT;