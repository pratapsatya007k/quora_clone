const mongoose = require('mongoose');

//schema :
const newpostSchema = new mongoose.Schema({
    username:String,
    path:String,
    answer:String,
    question:String
});

module.exports=mongoose.model("newpost",newpostSchema);