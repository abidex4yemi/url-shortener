const dotenv = require('dotenv');

const envFound = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'staging') {
  module.exports = require('./staging');
} else {
  module.exports = require('./dev');
}
