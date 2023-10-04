const asyncHandler = require('express-async-handler');
const logger = require('../../lib/helpers/loggerHelpers');
const ShortUniqueId = require('short-unique-id');
const { InMemoryDatabase } = require('in-memory-database');
const config = require('../../config');

const inMemoryDB = {};

const addUrlData = (url, data) => {
  inMemoryDB[url] = data;
  return data;
};

const getUrlData = (url) => {
  return inMemoryDB[url];
};

exports.encodeUrl = asyncHandler(async ({ longUrl }) => {
  let url = getUrlData(longUrl);

  if (url) {
    return {
      ...url,
      exist: true,
    };
  }

  const { randomUUID } = new ShortUniqueId({ length: 6 });
  const shortId = randomUUID();

  const shortUrl = `${config.baseUrl}:${config.port}/${shortId}`;
  url = {
    shortUrl,
    createdAt: new Date(),
    longUrl,
    shortId,
  };

  url = addUrlData(longUrl, url);

  return url;
});

exports.decodeUrl = asyncHandler(async (req, res) => {
  return {};
});

exports.getUrlStatistics = asyncHandler(async (req, res) => {
  return {};
});
