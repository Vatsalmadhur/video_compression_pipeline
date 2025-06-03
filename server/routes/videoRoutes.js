const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {uploadVideo, streamVideo} = require('../controllers/videoController');
const {v4:uuidv4} = require('uuid');

const storage =
    multer.diskStorage({
    destination : (req,res,cb) => {cb(null, 'uploads/')},

        filename: (req,file,cb) => {
        const hash = uuidv4();
        const filename= `${hash}${path.extname(file.originalname)}`;
        file.hash = hash;
        cb(null, filename);
    },
});
const upload = multer({storage});

router.post('/upload',upload.single('video'),uploadVideo);
router.get('/watch',streamVideo);
module.exports = router;
