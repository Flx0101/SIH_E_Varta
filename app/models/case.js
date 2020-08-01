const mongoose = require('mongoose');

const Case = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    caseNumber : {
        type : Number,
        required : true
    },
    description : {
        type :String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    members : {
        type : Array , 
        required : true
    },
    status : {
        type : Boolean , 
        required : true
    }
});

module.exports = mongoose.model('Case', Case);