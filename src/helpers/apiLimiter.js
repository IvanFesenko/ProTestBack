const rateLimit = require('express-rate-limit');

const httpCode = require('../constants/httpCode');

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  handler: (_req, res, _next) => {
    return res.status(httpCode.BAD_REQUEST).json({
      message: 'Too many requests, please try again later.',
    });
  },
});

module.exports = apiLimiter;
