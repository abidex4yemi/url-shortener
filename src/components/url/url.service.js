const asyncHandler = require('express-async-handler');
const logger = require('../../lib/helpers/loggerHelpers');
const ShortUniqueId = require('short-unique-id');
const config = require('../../config');
const urlDataStorage = require('./url.db');

exports.encodeUrl = asyncHandler(async ({ longUrl }) => {
  let url = urlDataStorage.getUrlData(longUrl);
  let result = null;

  if (url) {
    return {
      ...url,
      visitHistory: undefined,
      exist: true,
    };
  }

  const { randomUUID } = new ShortUniqueId({ length: 6 });
  const shortUrlId = randomUUID();

  const shortUrl = `${config.baseUrl}:${config.port}/${shortUrlId}`;
  url = {
    shortUrl,
    createdAt: new Date(),
    longUrl,
    shortUrlId,
    visitHistory: [],
  };

  url = urlDataStorage.addUrlData({ longUrl, shortUrlId, data: url });

  result = {
    ...url,
    visitHistory: undefined,
  };

  return result;
});

exports.decodeUrl = asyncHandler(async ({ shortUrlId }) => {
  let url = urlDataStorage.getUrlData(shortUrlId);
  let result = null;

  if (url) {
    const visitedDate = new Date();
    url.visitHistory.push(visitedDate);
    url = urlDataStorage.updateUrlData({ shortUrlId, newData: url });

    result = {
      ...url,
      visitHistory: undefined,
    };
  }

  return result;
});

exports.getUrlStatistics = asyncHandler(async ({ shortUrlId }) => {
  const url = urlDataStorage.getUrlData(shortUrlId);
  if (url) {
    url.totalClicks = url.visitHistory.length;
  }

  return url;
});
