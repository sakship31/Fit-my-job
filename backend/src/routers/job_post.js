const express = require('express')
const Job = require('../models/job')
const Org = require('../models/organisation')
const login_required = require('../middleware/org_login_req')
const login_required_normal = require('../middleware/login_required')
const { json } = require('body-parser')
const multer=require('multer')
const sharp=require('sharp')
const User = require('../models/user')

const app = new express.Router()

//create job
app.post('/createjob',login_required,async (req,res)=>{
   const {job_title,job_description,skills_required,location,start_date,end_date,apply_by} = req.body 
   console.log("apply by:",apply_by)
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
       .sort('apply_by')
       .then(posts => {
           res.send({ posts })
       })
       .catch(err => {
           console.log(err)
       })
})



//jobs by all organisations
app.get('/jobs', login_required_normal, (req, res) => {
    //console.log("CONNECTIONS=",req.user.connections)
    // if postedBy in connections of the requested user
    Job.find({})
    // Post.find({ $and: [{ postedBy: { $in: req.user.connections } }, { postedBy: req.user._id }] })
        .populate("postedBy", "_id name pic")
        .sort('apply_by')
        .then(posts => {
            res.send({ posts })
        })
        .catch(err => {
            console.log(err)
        })
 })

 //jobs by all organisations
app.get('/jobdetail/:id', login_required_normal, (req, res) => {
    Job.find({_id:req.params.id})
    //.populate("_id", "job_title job_description start_date end_date skills_required location apply_by postedBy")
    .then((post) => {
                console.log("postedBy-",post[0].postedBy)
                posted_by=post[0].postedBy
                Org.find({_id:posted_by})
                // .populate("_id", "_id name email pic")
                .then((user) => {
                    return res.send({ post, user })
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
 })

module.exports = app 