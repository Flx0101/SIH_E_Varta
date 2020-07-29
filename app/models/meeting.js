const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const { Mongoose } = require('mongoose');

const Meeting = mongoose.Schema({
    _id : Mongoose.Schema.Types.ObjectID,
    caseID : {
        type : ObjectID,
        required : true
    },
    owner : {
        type :String,
        required : true
    },
    meetingID : {
        type : String,
        required : true
    },
    meetingURL : {
        type : Array , 
        required : true
    }

});

module.exports = mongoose.model('Meeting', Meeting);