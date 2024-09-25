const jwt = require('jsonwebtoken');

// Token
function generateToken(user) {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
}

// Middleware for authentication
async function authenticate(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(401).send('Invalid token');
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(400).send('Invalid token.');
    }
}

module.exports = {
    generateToken,
    authenticate
}