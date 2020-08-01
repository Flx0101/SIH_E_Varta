const config = require('./../config/');
var middleware = require('./token');
const { ObjectId } = require('mongodb');
const MongoClient = require("mongodb").MongoClient;

let memberCheck = (req , res , next) => {
    req.decoded = middleware.checkToken; 
    var meetingID = req.body.meetingID;
    var meetingURL = req.body.meetingURL;
    MongoClient.connect(config.dbURI , (err , client) => {
        client.db(config.dbName).collection(db.meetingColl).find({
            meetingID : meetingID
        })
        .toArray()
        .then((doc) =>  {
            if (doc.length == 1){
                MongoClient.connect(config.dbURI , (err , client) => {
                    client.db(config.dbName).collection(db.casesColl).find(ObjectId(doc._id.toString()))
                    .then((doc) => {
                    console.log(doc);
                    if(doc.members.includes(req.decoded)){
                        res.status(200).json({
                            "message" : "Authorized person added"
                        })
                    }
                    else{
                        res.status(401).json({
                            "message" : "Authorization Failed.Cannot join the meeting"
                        })
                    }

                    })
                    .catch((err) => console.log(err));
                });
            }
        })
        .catch((err) => console.log(err));

    });
    
}