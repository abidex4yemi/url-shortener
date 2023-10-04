module.exports = {
  appName: process.env.APP_NAME,
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: {
      v1: process.env.API_PREFIX_V1,
    },
  },
};
