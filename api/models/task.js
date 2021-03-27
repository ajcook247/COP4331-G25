const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
var Int32 = require('mongoose-int32');

const TaskSchema = new Schema({
    Id:
    {
        type: Int32
    },
    UserId:
    {
        type: Int32
    },
    Name:
    {
        type: String,
        required: true
    },
    Description:
    {
        type: String,
        required: false
    },
    Deadline:
    {
        type: Date,
        required: false
    },
    Done:
    {
        type: Boolean,
        required: true
    },
    Urgent:
    {
        type: Boolean,
        required: true
    }
})