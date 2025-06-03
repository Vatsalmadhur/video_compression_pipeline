const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/video-pipeline',{});
        console.log("connected");
    }
    catch(err){
        console.log(err);
    }
};

    module.exports = connectDB;
