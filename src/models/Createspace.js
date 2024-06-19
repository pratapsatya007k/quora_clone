const mongoose=require('mongoose');

const CreateSpaceSchema=new mongoose.Schema({
    Name:{type:String,unique:true},
    Description:String,
    username:String,
    status: String
})
 module.exports=mongoose.model("Createspace",CreateSpaceSchema);