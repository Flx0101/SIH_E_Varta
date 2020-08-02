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
const routes = require('./../helpers').router;
const Case = require('./../models/case');
const Meeting = require('./../models/meeting');


routes.get('/cases', middleware.checkToken, (req, res, next) => {
    console.log("helo");
    //decoded value : req.decoded;
    let email = req.decoded.email;

    MongoClient.connect(config.dbURI, (err, client) => {
        console.log(email);
        client.db(config.dbName).collection(config.casesColl).find({
                "members": email
            }).toArray()
            .then((doc) => {
                console.log(doc);
                res.status(200).json(doc);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({
                        "message": "Fetching failed",
                        "description": err

                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json({
                            "message": "Fetching failed",
                            "description": err
                        })
                    });
            });
        res.render('dashboard');
    });
});
routes.post('/registerCase', (req, res, next) => {
    var det = new Case({
        caseNumber: req.body.caseNumber,
        description: req.body.desc,
        date: req.body.date,
        members: req.body.members,
        status: req.body.status
    });
    det.date = new Date(det.date);
    console.log(det);
    console.log(typeof(det.date));
    MongoClient.connect(config.dbURI, (err, client) => {
        client.db(config.dbName).collection(config.casesColl).insertOne(det)
            .then((det) => {
                console.log(det);
                res.status(200).json({
                    "msg": "Successfully registered",
                })
            })
            .catch((err) => console.log(err));
    });

});

routes.post("/registerMeeting", middleware.checkToken, (req, res, next) => {
    var det = {
            _id: mongoose.Types.ObjectId(),
            caseID: req.body.caseID,
            owner: req.decoded,
            meetingID: req.body.meetingID,
            meetingURL: req.body.meetingURL
        }
        //Saving the meetings based on CaseID

    MongoClient.connect(config.dbURI, (err, client) => {
        client.db(config.dbName).collection(meetingColl).insertOne(det)
            .then((det) => {
                console.log(det._doc);
                res.status(200).json("Meeting Registered");
            })
            .catch((err) => {
                res.status(400).json({
                    "message": "Error occured",
                    "Detail": err
                });
            })
    });
});

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
                console.log(typeof(req.body.category));
                var category = req.body.category;
                var det = new Form({
                    _id: mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    password: sha256(req.body.psw)
                });
                console.log("Updating");
                if (category == "Lawyer") {
                    console.log("Done");
                    category = config.lawyerColl;
                } else if (category == "Police") {
                    category = config.policeColl;
                } else if (category == "Judge") {
                    category = config.judgeColl;
                } else {
                    category = "users";
                }
                MongoClient.connect(config.dbURI, (err, client) => {

                    client.db(config.dbName).collection(category).insertOne(det)
                        .then((det) => {
                            console.log("Saved");
                            return res.status(200).send({ message: "Done" });
                        }).catch(err => console.log(err));
                });

            },
            '/login': (req, res, next) => {
                var det = new User({
                    'email': req.body.email,
                    'password': sha256(req.body.psd),
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

                                res.status(200).json({
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

            },
            '/lawyerLogin': (req, res, next) => {
                var det = new User({
                    'email': req.body.email,
                    'password': sha256(req.body.psd),
                });
                MongoClient.connect(config.dbURI, (err, client) => {

                    client.db(config.dbName).collection(config.lawyerColl).findOne({ 'email': det.email })
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

            },
            '/policeColl': (req, res, next) => {
                var det = new User({
                    'email': req.body.email,
                    'password': sha256(req.body.psd),
                });
                MongoClient.connect(config.dbURI, (err, client) => {

                    client.db(config.dbName).collection(config.policeColl).findOne({ 'email': det.email })
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

            },
            '/judgeLogin': (req, res, next) => {
                var det = new User({
                    'email': req.body.email,
                    'password': sha256(req.body.psd),
                });
                MongoClient.connect(config.dbURI, (err, client) => {

                    client.db(config.dbName).collection(config.judgeColl).findOne({ 'email': det.email })
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