const router=require('express').Router();
const Post=require("../models/posts");

router.post("/new",async (req,res)=>{
    const newPost= new Post({
        username:req.body.username,
        path:req.body.path,
        answer:req.body.answer,
        question:req.body.question
    });
    await newPost.save();

});
 
router.get("/getposts",async(req,res)=>{
    try{
    const response= await Post.find();
    res.json(response);
    } catch(err){
        console.log(err);
    }
})

module.exports=router;