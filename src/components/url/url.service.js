const asyncHandler = require('express-async-handler');
const logger = require('../../lib/helpers/loggerHelpers');
const ShortUniqueId = require('short-unique-id');
const config = require('../../config');

const db = {};

const addUrlData = ({ longUrl, shortUrlId, data }) => {
  db[longUrl] = { data, shortUrlId };
  return data;
};

const updateUrlData = ({ shortUrlId, newData }) => {
  for (const key in db) {
    if (db[key].shortUrlId === shortUrlId || key === shortUrlId) {
      db[key].data = newData;
      return newData;
    }
  }
  return false;
};

const getUrlData = (key) => {
  for (const longUrl in db) {
    if (db[longUrl].shortUrlId === key) {
      return db[longUrl].data;
    }
    if (longUrl === key) {
      return db[longUrl].data;
    }
  }

  return null;
};

exports.encodeUrl = asyncHandler(async ({ longUrl }) => {
  let url = getUrlData(longUrl);
  let result = null;

  if (url) {
    return {
      ...url,
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

  url = addUrlData({ longUrl, shortUrlId, data: url });
  result = {
    ...url,
    visitHistory: undefined,
  };

  return result;
});

exports.decodeUrl = asyncHandler(async ({ shortUrlId }) => {
  let url = getUrlData(shortUrlId);
  let result = null;

  if (url) {
    const visitedDate = new Date();
    url.visitHistory.push(visitedDate);
    url = updateUrlData({ shortUrlId, newData: url });

    result = {
      ...url,
      visitHistory: undefined,
    };
  }

  return result;
});

exports.getUrlStatistics = asyncHandler(async ({ shortUrlId }) => {
  const url = getUrlData(shortUrlId);
  if (url) {
    url.totalClicks = url.visitHistory.length;
  }

  return url;
});
