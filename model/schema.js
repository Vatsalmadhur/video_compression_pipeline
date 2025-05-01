const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    originalName: {type: String, required: true},
    hash:{type:String, required:true},
    originalPath:{type:String, required:true},
    status:{type:String,enum:["processing","done"],default:"processing"},
    createdAt:{type:Date,default:Date.now},
})

module.exports = mongoose.model('Video', videoSchema);
