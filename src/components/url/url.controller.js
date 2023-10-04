const urlError = require('./url.error');
const asyncHandler = require('express-async-handler');
const logger = require('../../lib/helpers/loggerHelpers');
const { validationResult } = require('express-validator');
const { sendResponse } = require('../../lib/helpers/responseHelpers');
const urlService = require('./url.service');
const { URL } = require('url');
const dns = require('dns');
const dnsPromises = dns.promises;

exports.encodeUrl = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.info('Invalid inputs');
    throw urlError.InvalidInput(errors.mapped());
  }

  const { longUrl } = req.body;
  const urlObject = new URL(longUrl);
  const dnsLookup = await dnsPromises.lookup(urlObject.hostname);

  if (!dnsLookup?.address) {
    return res.status(400).send(
      sendResponse({
        message: 'Invalid URL, Please provide a valid url',
        content: {
          url,
        },
        success: true,
      })
    );
  }

  let statusCode = 201;
  let responseMessage = 'Url successfully encoded.';
  const url = await urlService.encodeUrl({ longUrl });

  if (url?.exist) {
    statusCode = 200;
    responseMessage = 'Url already encoded';
  }

  return res.status(statusCode).send(
    sendResponse({
      message: responseMessage,
      content: url,
      success: true,
    })
  );
});

exports.decodeUrl = asyncHandler(async (req, res) => {
  return {};
});

exports.getUrlStatistics = asyncHandler(async (req, res) => {
  return {};
});
