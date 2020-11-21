const express = require('express')
const Job = require('../models/job')
const Org = require('../models/organisation')
const login_required = require('../middleware/org_login_req')
const { json } = require('body-parser')
const multer=require('multer')
//const sharp=require('sharp')

const app = new express.Router()

//user specific posts (self and other users)
app.get('/profile/org/:id', login_required, (req, res) => {
   // console.log(req.params.id)
   Job.find({postedBy:req.params.id})
       .populate("_id", "_id name email pic followers")
       //.populate("comments.postedBy","_id name")
       .sort('-createdAt')
       .then((jobs) => {
           // console.log("posts-",posts)
           Org.find({ _id: req.params.id })
               .populate("_id", "_id name email pic followers")
               .then((org) => {
                   return res.send({ jobs, org })
               }).catch(err => {
                   console.log(err)
               })
       }).catch(err => {
           console.log(err)
       })
})

app.post('/updateprofilepic',login_required,async (req,res)=>{
    Org.findByIdAndUpdate(req.org._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).send({error:"pic cannot be updated"})
         }
         res.send(result)
    })

})


app.post('/updateprofile',login_required,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedupdate=['about','website_link','location']
    const isValidop=updates.every((update)=>allowedupdate.includes(update))

    if(!isValidop){
        return res.status(400).send({error:'Invalid updates!'})
    }

    try{
        // console.log(req.org)
        updates.forEach((update)=>req.org[update]=req.body[update])
        await req.org.save()
        //const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.send(req.org)
    }catch(e){
        return res.status(500).send(e)
    }
})

module.exports = app 