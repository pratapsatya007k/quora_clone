const express=require('express');
const router=express.Router();
const Space=require('../models/Createspace');

router.post("/space", async (req,res)=>{
    try{
        const newItem=new Space({
            Name:req.body.Name,
            Description:req.body.Description,
            username:req.body.username,
            status:req.body.status
        });
        await newItem.save();
        res.status(201).send("Item added") 

    }catch(err){
        console.log(err);
    }
});
router.get("/getspace",async(req,res)=>{
    const { status } = req.query;
  try { 
    const data = await Space.find({status:status });
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/otherspaces",async (req,res)=>{
  const { status } = req.query;
  try { 
    const data = await Space.find({status:status });
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/updateStatus",async(req,res)=>{
  const {Name,status}=req.query;
  let statusspace=''
  if(status=="Following"){
    statusspace="Follow"
  }else{
    statusspace="Following"
  }
  const response=await Space.updateOne({Name,status},{$set:{status:statusspace}});
  res.json(response);
});

module.exports=router;