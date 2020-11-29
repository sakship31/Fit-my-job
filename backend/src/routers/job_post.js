const express = require('express')
const Job = require('../models/job')
const Org = require('../models/organisation')
const login_required = require('../middleware/org_login_req')
const login_required_normal = require('../middleware/login_required')
const { json } = require('body-parser')
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
   Job.find({postedBy:req.org})
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
    Job.find({})
        .populate("postedBy", "_id name pic")
        .sort('apply_by')
        .then(posts => {
            res.send({ posts })
        })
        .catch(err => {
            console.log(err)
        })
 })

 //job detail(for org)
app.get('/jobdetail/org/:id', login_required, (req, res) => {
    Job.find({_id:req.params.id})
    .populate("applicants","_id name pic")
    .then((post) => {
                posted_by=post[0].postedBy
                Org.find({_id:posted_by})
                .then((user) => {
                    Org.find({_id:posted_by})
                    return res.send({ post, user })
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
 })

 
 //job detail(for normal user)
app.get('/jobdetail/:id', login_required_normal, (req, res) => {
    Job.find({_id:req.params.id})
    .then((post) => {
                posted_by=post[0].postedBy
                Org.find({_id:posted_by})
                .then((user) => {
                    return res.send({ post, user })
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
 })

 //delete job

 app.post('/job/delete',login_required,async (req,res)=>{
    try{
        const post=await Job.findOneAndDelete({_id:req.body.id,postedBy:req.org._id})
        if(!post){
            return res.status(404).send()
        }
        res.send(post)
    }catch{
        return res.status(500).send()
    }
})

 //applicant
 app.post('/apply', login_required_normal, (req, res) => {
    Job.findByIdAndUpdate(req.body.jobId, {
        $push: { applicants: req.user._id }
    }, {
        new: true
    })
        .exec((err, result) => {
            if (err) {
                return res.status(422).send(err)
            } else {
                res.send(result)
            }
        })
 })

module.exports = app 