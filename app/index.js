'use strict';

const config = require('./config');


// Create an IO Server instance
let ioServer = app => {
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    io.set('transports', ['websocket']);
    io.use((socket, next) => {
        require('./session')(socket.request, {}, next);
    });
    require('./socket')(io, app);
    console.log(io);
    return server;
}

module.exports = {
    router: require('./routes')(),
    session: require('./session'),
    ioServer,
    logger: require('./logger')
}