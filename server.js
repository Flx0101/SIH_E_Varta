'use strict';
const express = require('express');
const app = express();
const chatConf = require('./app');
const port = process.env.PORT || 3000;
const stream = require('./app/socket');
var path = require('path');
let favicon = require('serve-favicon');

const bodyParser = require('body-parser');
app.use(favicon('./app/favicon.ico'));

app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(chatConf.session);

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