'use strict';
const express = require('express');
const app = express();
const chatConf = require('./app');
const passport = require('passport');
const port = process.env.PORT || 3000;
const videoRouter = require('./app/video');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/videoConf', videoRouter);
app.use(chatConf.session);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('morgan')('combined', {
    stream: {
        write: message => {
            chatConf.logger.log('info', message);
        }
    }
}));

app.use('/', chatConf.router);

chatConf.ioServer(app).listen(port, () => {
    console.log('Server Running on Port: ', port);
});