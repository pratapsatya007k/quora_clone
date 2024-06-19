const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose); // Apply passport-local-mongoose plugin

module.exports = mongoose.model("User", userSchema);
