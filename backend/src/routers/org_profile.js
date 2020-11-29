const express = require('express')
const Job = require('../models/job')
const Org = require('../models/organisation')
const login_required = require('../middleware/org_login_req')
const login_required2 = require('../middleware/login_required')
const { json } = require('body-parser')

const app = new express.Router()

//org profile (self and other users)
app.get('/profile/org/:id', login_required, (req, res) => {
   Job.find({postedBy:req.params.id})
       .populate("_id", "_id name email pic followers")
       .sort('-createdAt')
       .then((jobs) => {
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

//org profile (self and other users) for normal users to visit
app.get('/profile/org/c/:id', login_required2, (req, res) => {
    Job.find({postedBy:req.params.id})
        .populate("_id", "_id name email pic followers")
        .sort('-createdAt')
        .then((jobs) => {
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
        updates.forEach((update)=>req.org[update]=req.body[update])
        await req.org.save()
        res.send(req.org)
    }catch(e){
        return res.status(500).send(e)
    }
})

//follow
app.post('/follow',login_required2,(req,res)=>{
    Org.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
    res.send(result)
    }
    )
})

//unfollow
app.post('/unfollow',login_required2,(req,res)=>{
    Org.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).send(err)
        }
    res.send(result)
    }
    )
})

module.exports = app 