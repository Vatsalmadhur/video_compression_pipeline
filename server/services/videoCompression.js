const { exec } = require('child_process');
const Ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const compressVideo = (inputPath, outputPath, resolution) => {
    console.log("input", inputPath, " ", outputPath, " ", resolution);
    return new Promise((resolve, reject) => {
        const cmd = `ffmpeg -i "${inputPath}" -vcodec libx264 -crf 28 -preset slow -vf "scale='trunc(iw*${resolution}/ih/2)*2':${resolution}" -c:a aac -b:a 128k "${outputPath}"`;
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error('Error during video compression:', error.message);
                console.error(stderr);
                reject(error);
                return;
            }
            console.log('Video compression finished:', stdout);
            resolve(outputPath);
        });
    });
};

module.exports=compressVideo;
