/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const dotenv = require('dotenv');

module.exports = function () {
  dotenv.config({
    path: path.resolve('.env.test'),
  });
};
