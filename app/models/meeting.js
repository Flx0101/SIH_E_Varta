const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Meeting = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    caseID : {
        type : String,
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