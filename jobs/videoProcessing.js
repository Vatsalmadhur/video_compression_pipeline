const {Queue} = require('bullmq');
const { Worker } = require('bullmq');
const {compressVideo} = require('../services/videoCompression');
const {path} = require('path');
const {Video} = require('../model/schema');
const {Redis} = require('ioredis');

const connection = new Redis({maxRetriesPerRequest: null});
const videoQueue = new Queue('videoQueue',{connection});

const worker = new Worker('videoQueue', async (job)=>{
    const {hash,originalVideo} = job.data;

    const resolutions = [144,240,360];
    const outputDir = "processed";

    for(const res of resolutions){
        const outputPath = path.join(outputDir,`${hash}-${res}p.mp4`);
        await compressVideo(originalVideo,outputPath,res);
    }

    await Video.findOneAndUpdate({hash},{status: "ready"});
},{connection});
 module.exports = {videoQueue};
