const { check, param } = require('express-validator');

const message = {
  longUrl: 'longUrl is required',
  shortUrlId: 'shortUrlId is required',
};

exports.validateLongUrl = () => [
  check('longUrl', message.longUrl).trim(' ').isURL(),
];

exports.validateShortUrlId = () => [
  param('shortUrlId', message.shortUrlId).trim(' ').notEmpty(),
];
