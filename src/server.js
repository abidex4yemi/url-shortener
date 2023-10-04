const app = require('./app');
const config = require('./config');
const logger = require('./lib/helpers/loggerHelpers');
const PORT = process.env.PORT || config.port;

const server = app.listen(PORT, (err) => {
  if (err) {
    logger.error(err);
    // process.exit(1);
  }

  logger.info(`Server listening on port: ${PORT}`);
});
