'use strict';
const config = require('../config');
const Mongoose = require('mongoose');
Mongoose.connect(config.dbURI, {
    useNewUrlParser: true
});
console.log("Url: " + config.dbURI);
// Log an error if the connection fails
Mongoose.connection.on('error', error => {
    console.log('error', 'Mongoose connection error: ' + error);
});


module.exports = {
    Mongoose
}