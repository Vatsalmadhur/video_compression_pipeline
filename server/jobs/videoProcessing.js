const { Queue, tryCatch } = require("bullmq");
const { Worker } = require("bullmq");
const path = require("path");
const Video  = require("../model/schema");
const { Redis } = require("ioredis");
const compressVideo = require("../services/videoCompression");

const connection = new Redis({ maxRetriesPerRequest: null });
const videoQueue = new Queue("videoQueue", { connection });

const worker = new Worker(
    "videoQueue",
    async (job) => {
try{
        const { hash, originalPath } = job.data;
        console.log("worker runs");
        console.log(job.data);
        const resolutions = [144,240,360];
        const outputDir = path.join(__dirname, "..", "processed");
        console.log(outputDir);
        const inputPath = path.join(__dirname, "..", originalPath);
        console.log(originalPath, inputPath);
        await Promise.all(
            resolutions.map(async (res) => {
                console.log("for loop runs", `${hash}-${res}p`);
                const outputPath = path.join(outputDir, `${hash}-${res}p.mp4`);
                console.log("output path", outputDir);
                await compressVideo(inputPath, outputPath, res);
                console.log(`${hash}-${res}p`, "compressed");
            })
        )
            .then(console.log("Resolved"))
            .catch((err) => console.log(err));
        await Video.findOneAndUpdate(
            { hash },
            {
                $set: { status: "ready" },
            }
        );
        console.log("worker updated");

}
catch(err){
console.log(err)
}
    },
    { connection }
);
module.exports = { videoQueue };
