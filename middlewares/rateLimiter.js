const rateLimiter = require('express-rate-limit');
const ms = require('ms');

const limiter = rateLimiter({
  windowMs: ms('15m'),
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
