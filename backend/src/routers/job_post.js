const express = require('express')
const Job = require('../models/job')
const Org = require('../models/organisation')
const login_required = require('../middleware/org_login_req')
const { json } = require('body-parser')
const multer=require('multer')
const sharp=require('sharp')

const app = new express.Router()

//create job
app.post('/createjob',login_required,async (req,res)=>{
   const {job_title,job_description,skills_required,location,start_date,end_date,apply_by} = req.body 
   if(!job_title||!job_description||!skills_required ||!location || !start_date|| !end_date || !apply_by){
     return  res.status(422).json({error:"Please add all the fields"})
   }
   const job = new Job({
      job_title,job_description,skills_required,location,start_date,end_date,apply_by,
       postedBy:req.org
   })
   try{
       await job.save()
       res.status(201).send(job)
   }catch(e){
       res.status(400)
       res.send(e)        
   }

})

//jobs by logged in organisation
app.get('/joblist', login_required, (req, res) => {
   //console.log("CONNECTIONS=",req.user.connections)
   // if postedBy in connections of the requested user
   Job.find({postedBy:req.org})
   // Post.find({ $and: [{ postedBy: { $in: req.user.connections } }, { postedBy: req.user._id }] })
       .populate("postedBy", "_id name pic")
       .sort('-createdAt')
       .then(posts => {
           res.send({ posts })
       })
       .catch(err => {
           console.log(err)
       })
})



module.exports = app 