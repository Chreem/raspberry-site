const env = require('node-env-file');
env(__dirname + '/.env');
const {
    EXPRESS_PORT,
    RASPBERRY_IP,
    ...OTHER_ENV
} = process.env;

module.exports = {
    EXPRESS_PORT: EXPRESS_PORT || 4000,
    RASPBERRY_IP: RASPBERRY_IP || '127.0.0.1',
    ...OTHER_ENV
};
