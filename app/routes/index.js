'use strict';
const h = require('../helpers');
const config = require('../config');
const Form = require('../models/new_user');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const sha256 = require('sha256');
const User = require('./../models/user');
const { ReplSet } = require('mongodb');
let jwt = require('jsonwebtoken');
let middleware = require('./../middleware/token');
const { render } = require('ejs');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login');
            },
            '/video': (req, res, next) => {
                console.log("reached to video page");
                res.render('video');
            },
            '/logout': (req, res, next) => {
                req.logout();
                res.redirect('/');
            }
        },


        'post': {
            '/register': (req, res, next) => {
                var det = new Form({
                    _id: mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    password: sha256(req.body.psw),
                });
                console.log("Updating");

                MongoClient.connect(config.dbURI, (err, client) => {

                    client.db(config.dbName).collection("users").insertOne(det)
                        .then((det) => {
                            console.log("Saved");
                            return res.redirect('/');
                        }).catch(err => console.log(err));
                });

            },
            '/login': (req, res, next) => {
                var det = new User({
                    'email': req.body.email,
                    'password': sha256(req.body.psd)
                });
                MongoClient.connect(config.dbURI, (err, client) => {

                    client.db(config.dbName).collection("users").findOne({ 'email': det.email })
                        .then((doc) => {
                            console.log(doc.password);
                            console.log(det.password);
                            if (doc.password == det.password) {
                                let token = jwt.sign({ email: det.email },
                                    config.secret, { expiresIn: '24h' }
                                );

                                res.json({
                                    success: true,
                                    message: "Authenticated,GG",
                                    token: token
                                });
                                //Call the page instead of JSON
                                //return res.redirect('/dashboard/');
                            } else {
                                res.send(403).json({
                                    success: false,
                                    message: 'Incorrect username or password'
                                });
                                //return res.redirect('/asd');
                            }


                        }).catch((err) => {
                            console.log(err);
                        });
                });

            }
        },
        'NA': (req, res, next) => {
            res.status(404).sendFile(process.cwd() + '/views/404.htm');
        }
    }


    return h.route(routes);
}