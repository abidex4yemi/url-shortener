const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { urlModule } = require('./components');
const handler = require('./lib/helpers/errorHandlers');
const config = require('./config');

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(cors());
app.use(morgan('dev'));
app.use(
  express.urlencoded({
    limit: '2mb',
    extended: true,
  })
);

app.use(cookieParser());
app.use(helmet());
app.set('trust proxy', 1);

app.use(`${config.api.prefix.v1}/url`, urlModule.routes);

handler.handleErrors(app);

module.exports = app;
