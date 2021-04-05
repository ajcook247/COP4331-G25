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
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required:true
    },
    Name:
    {
        type: String,
        required: true
    },
    Tasks:
    {
        type: Array,
        
    }
  

});

module.exports = Collections = mongoose.model("Tasks", TaskSchema);
