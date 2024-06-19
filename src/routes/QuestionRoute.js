const router=require('express').Router();
const Question=require("../models/Question");

//post request:
router.post("/add",async(req,res)=>{
    try{
    const newQues= new Question({
        username:req.body.username,
        question:req.body.question,
        answers:req.body.answers
    });
    await newQues.save();
    res.status(201).send("question posted");
}catch(err){
    console.log(err);
    res.status(404).send("err in posting")
}
});

router.get("/getquestions",async(req,res)=>{
    try{
        const data= await Question.find();
        res.json(data);
    }catch(err){
        console.log(err);
    }
});
module.exports=router;