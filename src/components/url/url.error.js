const {
  StatusCodes: { UNPROCESSABLE_ENTITY, NOT_FOUND, UNAUTHORIZED },
} = require('http-status-codes');
const { AppError } = require('../../lib/helpers/errorFormatHelpers');

module.exports = {
  InvalidInput: (
    content = {},
    message = 'Invalid inputs',
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
  ShortUrlIdNotFound: (
    content = {},
    message = 'Short ID not found',
    name = null,
    innerException = null
  ) => new AppError(name, NOT_FOUND, message, content, innerException),
  InvalidIdParams: (
    content = {},
    message = 'Invalid ID params',
    name = null,
    innerException = null
  ) => new AppError(name, NOT_FOUND, message, content, innerException),
};
