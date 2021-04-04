const jwt = require('jsonwebtoken');

const User = require('../models/users/User');
const httpCode = require('../constants/httpCode');

const authorizeUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.get('Authorization');
    const token = authorizationHeader?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({
        message: 'Not authorized',
      });
    }

    const { userId } = await jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await User.findById(userId);
    if (!user || (user && token !== user.token)) {
      return res.status(httpCode.UNAUTHORIZED).send({
        message: 'Not authorized',
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(httpCode.FORBIDDEN).send({
      message: err.message,
    });
  }
};

module.exports = authorizeUser;
