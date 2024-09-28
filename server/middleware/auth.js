const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token received:', token); // Log the token received

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded user:', decoded); // Log the decoded token data (should include userId)
    req.user = decoded; // Attach the decoded user data to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

module.exports = authMiddleware;
