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
   const {job_title,job_description,skills_required,location} = req.body 
   if(!caption || !pic){
     return  res.status(422).json({error:"Please add all the fields"})
   }
   const post = new Post({
       caption,
       pic,
       postedBy:req.user
   })
   try{
       await post.save()
       res.status(201).send(post)
   }catch(e){
       res.status(400)
       res.send(e)        
   }

})