const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  username:String,
  filename: { type: String, required: true },
  path: { type: String, required: true },
  contentType: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
