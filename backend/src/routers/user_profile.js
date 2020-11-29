const express=require('express')
const Post=require('../models/post')
const User=require('../models/user')
const multer=require('multer')
//const sharp=require('sharp')
const login_required=require('../middleware/login_required')
const { findById } = require('../models/post')

const app = new express.Router()

app.post('/connect',login_required,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{connections:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        console.log("doneee")
      User.findByIdAndUpdate(req.user._id,{
          $push:{connections:req.body.followId}
          
      },{new:true}
      ,(err,result)=>{
          if(err){
              return res.status(422).json({error:err})
          }
          console.log("donee222")
          res.send(result)
      })
    }
    )
})
app.post('/remove',login_required,(req,res)=>{
    console.log("hey remove")
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{connections:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).send(err)
        }
      User.findByIdAndUpdate(req.user._id,{
          $pull:{connections:req.body.unfollowId}
          
      },{new:true}
      ,(err,result)=>{
          if(err){
            return res.status(422).send(err)
          }
          console.log("lala")
          res.send(result)
      })
    }
    )
})

app.post('/updatepic',login_required,async (req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).send({error:"pic cannot be updated"})
         }
         res.send(result)
    })

})

app.post('/addSkill/:id', login_required, (req, res) => {
    const name=req.body.name
    const project_url=req.body.project_url
    const skill={name,project_url}
    User.findByIdAndUpdate(req.params.id, {
        $push: { skills: {skill} }
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

app.post('/addEd/:id', login_required, (req, res) => {
    const study=req.body.study
    const uni_name=req.body.uni_name
    const studies={study,uni_name}
    console.log(studies)
    User.findByIdAndUpdate(req.params.id, {
        $push: { education: {studies} }
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


////////////////////////////////////////
//check self or other's connections
app.get('/network/:id',(req,res)=>{
    User.find({_id:req.params.id})
    .populate("connections","_id pic name following followers")
    .then((users)=>{       
                 return res.send({users})
         }).catch(err=>{
             console.log(err)
         })
    
})

app.get('/allusers',login_required,(req,res)=>{   
    User.find({$and:[{_id:{$nin:req.user.connections}},{_id:{$nin:req.user._id}}]})
    .sort('-createdAt')
    .then((users)=>{
        res.send({users})  
    }).catch(err=>{
        console.log(err)
    })

})

module.exports=app