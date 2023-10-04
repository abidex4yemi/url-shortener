const asyncHandler = require('express-async-handler');
const logger = require('../../lib/helpers/loggerHelpers');
const ShortUniqueId = require('short-unique-id');
const config = require('../../config');

const db = {};

const addUrlData = ({ longUrl, shortId, data }) => {
  db[longUrl] = { data, shortId };
  return data;
};

const updateUrlData = ({ shortId, newData }) => {
  for (const key in db) {
    if (db[key].shortId === shortId || key === shortId) {
      db[key].data = newData;
      return true;
    }
  }
  return false;
};

const getUrlData = (key) => {
  for (const longUrl in db) {
    if (db[longUrl].shortId === key) {
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
    visitHistory: [],
  };

  url = addUrlData({ longUrl, shortId, data: url });

  return url;
});

exports.decodeUrl = asyncHandler(async ({ shortUrlId }) => {
  const url = getUrlData(shortUrlId);
  if (url) {
    const visitedDate = new Date();
    url.visitHistory.push(visitedDate);
    updateUrlData({ shortUrlId, newData: url });
  }

  return url;
});

exports.getUrlStatistics = asyncHandler(async (req, res) => {
  return {};
});
