const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Int32 = require('mongoose-int32');

//create schema
const UserSchema = new Schema({
    UserId:
    {
        type: Int32
    },
    Login:{
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Verified: {
        type: Boolean,
        required: true
    }
});

module.exports = user = mongoose.model("Users", UserSchema);