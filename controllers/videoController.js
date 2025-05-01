const {v4 : uuuid4} = require('uuid');
const path = require('path');
const Video = require('../model/schema');

const uploadVideo = async (req, res) => {
try{
    const file = req.file;
    if(!file) {
        res.status(400).json({message:"No file uploaded"});
    }

    const newVideo = new Video({
        originalName: file.originalname,
        hash:file.hash,
        originalPath: file.path,
        status:"processing"
    })

    await newVideo.save();
    const watchURL= `http://localhost:3000/videos/watch?v=${file.hash}`;
    res.status(200).json({message:"File uploaded successfully", watchURL,hash:file.hash});
}
catch(err) {
    console.error(err);
    res.status(500).json({message:"Upload Failed"});
}
};

module.exports = {uploadVideo,};
