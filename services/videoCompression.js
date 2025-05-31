const {ffmpeg} = require('fluent-ffmpeg');
const path = require('path');

const compressVideo = (inputPath,outputPath,res) => {
    return new Promise((resolve,reject) => {
        ffmpeg(inputPath)
        .videoCodec('libx264')
        .size('?x$res')
        .output(outputPath)
        .on('end', () => {
            console.log('Video compression finished');
            resolve(outputPath);
        })
        .on('error', (err) => {
            console.error('Error during video compression:', err);
            reject(err);
        })
        .run();

    })}
        module.exports = {compressVideo};

