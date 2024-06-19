const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mime = require('mime-types'); // Importing mime-types instead of file-type
const Image = require('../models/imageModel');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const mimeType = mime.lookup(file.originalname);
    if (!mimeType || !mimeType.startsWith('image/')) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  }
}).single('image');

// Route to handle image upload
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file', err: err.message });
    }

    try {
      const image = new Image({
        username:req.body.username,
        filename: req.file.filename,
        path: req.file.path,
        contentType: req.file.mimetype,
      });

      await image.save();

      res.status(201).json({ message: 'File uploaded successfully', image });
    } catch (error) {
      res.status(500).json({ message: 'Error saving file data', error });
    }
  });
});

router.get("/getfilename", async (req, res) => {
  const { username } = req.query;
  try {
    const regex = new RegExp(`^${username}$`, 'i'); // Case insensitive match
    const data = await Image.find({ username: regex })
      .sort({ _id: -1 }) // Sort by _id in descending order
      .limit(1); // Limit to the first result (last added document)
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});


module.exports = router;
