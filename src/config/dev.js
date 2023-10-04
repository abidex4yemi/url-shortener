module.exports = {
  appName: process.env.APP_NAME,
  port: 4000,
  dbURI: process.env.MONGODB_URI_DEV,
  redis: {
    redisPort: process.env.REDIS_PORT,
    redisHost: process.env.REDIS_HOST,
    redisFamily: process.env.REDIS_FAMILY,
    redisPassword: process.env.REDIS_PASSWORD,
  },
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: {
      v1: process.env.API_PREFIX_V1,
    },
  },
};
