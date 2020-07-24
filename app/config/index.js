'use strict';

if (process.env.NODE_ENV === 'production') {
    // Offer production stage environment variables
    // process.env.REDIS_URL :: redis://redistogo:d99d16b16b040428cccbc6a0c6810afe@cobia.redistogo.com:9899/
    module.exports = {
        host: process.env.host || "",
        dbURI: process.env.dbURI,
        sessionSecret: process.env.sessionSecret,

    }
} else {
    // Offer dev stage settings and data
    module.exports = require('./development.json');
}