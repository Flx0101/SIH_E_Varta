'use strict';

const config = require('./config');

// Create an IO Server instance
let ioServer = app => {
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    const stream = require('./socket');
    const path = require('path');
    io.of('/stream').on('connection', stream);
    return server;
}

module.exports = {
    router: require('./routes')(),
    ioServer
}