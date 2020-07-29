const config = require('./../config/');
var middleware = require('./token');
const MongoClient = require("mongodb").MongoClient;

let memberCheck = (req , res , next) => {
    req.decoded = middleware.checkToken; 
    var meetingID = req.body.meetingID;
    var meetingURL = req.body.meetingURL;
    MongoClient.connect(config.dbURI , (err , client) => {
        client.db(config.dbName).collection(db.meetingColl).find(req.decoded)
        .toArray()
        .then((doc) =>  {
            
        })
        .catch()

    });
    
}