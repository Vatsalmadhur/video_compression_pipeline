const { v4: uuuid4 } = require("uuid");
const path = require("path");
const Video = require("../model/schema.js");
const { videoQueue } = require("../jobs/videoProcessing");
const fs = require("fs");
const uploadVideo = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: "No file uploaded" });
        }

        const newVideo = new Video({
            originalName: file.originalname,
            hash: file.hash,
            originalPath: file.path,
            status: "processing",
        });

        await newVideo.save();
        await videoQueue.add("process", {
            hash: file.hash,
            originalPath: file.path,
        });

        const watchURL = `${process.env.FRONTEND_URL}/videos/watch?v=${file.hash}`;
        console.log(watchURL);
        res.status(200).json({
            message: "File uploaded successfully",
            watchURL,
            hash: file.hash,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Upload Failed" });
    }
};

const streamVideo = async (req, res) => {
    try {
        const { v: hash, res: resolution } = req.query;
        if (!hash) {
            return res.status(400).json({ message: "Video hash is required" });
        }

        const video = await Video.findOne({ hash });
        if (!video) {
            res.status(404).json({ message: "Video not found" });
        }

        let filepath;
        if (resolution && video.status === "ready") {
            filepath = path.join("processed", `${hash}-${resolution}.mp4`);
        } else {
            filepath = video.originalPath;
        }

        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ message: "Video file not found" });
        }
        const stat = fs.statSync(filepath);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;

            const stream = fs.createReadStream(filepath, { start, end });

            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": "video/mp4",
            });

            stream.pipe(res);
        } else {
            res.writeHead(200, {
                "Content-Length": fileSize,
                "Content-Type": "video/mp4",
            });
            fs.createReadtream(filepath).pipe(res);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error streaming video" });
    }
};
const listVideo = async (req, res) => {
    const videos = await Video.find().sort({ createdAt: -1 }).lean();
    res.json(videos);
};
module.exports = { uploadVideo, streamVideo, listVideo };
