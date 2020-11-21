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
        // .populate("comments.postedBy", "_id name pic")
        // .populate("postedBy", "_id name pic")
        .exec((err, result) => {
            if (err) {
                return res.status(422).send(err)
            } else {
                res.send(result)
                // console.log("skill:",skill)
                // console.log("user:",res)
            }
        })
})


app.post('/search',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({name:{$regex:userPattern}})
    .select("_id name pic")
    .then(user=>{
        res.send({user})
    }).catch(err=>{
        console.log(err)
    })
})

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

//////////////////////////////////////////////////////////////////////////
// app.get('/following/:id',(req,res)=>{
//     User.find({_id:req.params.id})
//     .populate("following","_id pic name following followers")
//     .then((users)=>{       
//                  return res.send({users})
//          }).catch(err=>{
//              console.log(err)
//          })
    
// })

// app.get('/followers/:id',(req,res)=>{
//     User.find({_id:req.params.id})
//     .populate("followers","_id pic name followers")
//     .then((users)=>{   
//             return res.send({users})
//     }).catch(err=>{
//         console.log(err)
//     })

// })


// app.delete('/users/me',login_required,async (req,res)=>{
//     try{
//     //     const _id=req.user._id
//     i=0
//     console.log('heeee')
//     console.log(req.user.following)
//         User.find({_id:{$in:req.user.following}})
//         .then(following=>{  
//             while(i<following.length){
//             console.log(following[i])
//             console.log('hey',following[i]._id)
//             console.log('hey1',req.user._id)
//             User.findByIdAndUpdate(following[i]._id,{
//                 $pull:{followers:req.user._id}
//             },{
//                 new:true
//             },(err,result)=>{
//                 if(err){
//                     return res.status(422).send(err)
//                 }
//             //   User.findByIdAndUpdate(req.user._id,{
//             //       $pull:{following:following._id}
                  
//             //   },{new:true},(err,result)=>{
//             //     if(err){
//             //         return res.status(422).send(err)
//             //     }
//             //     res.send(req.user)

//             // })
//               console.log(following[i])  
//             res.status(200).send(req.user)
//             }
//             )
//         // await req.user.remove()
//         // res.send(following[i])
//   i=i+1 }}).catch(e=>{
//         return res.status(500).send()
//     })
// }catch(e){
//     console.log('h')
//     console.log(e)
// }})

        
module.exports=app