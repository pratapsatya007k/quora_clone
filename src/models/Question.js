const mongoose=require('mongoose');

const quesSchema=new mongoose.Schema({
    username:String,
    question:{type:String,unique:true, required : true},
});

module.exports=mongoose.model("question",quesSchema);