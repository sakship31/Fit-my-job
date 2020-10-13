const express=require('express')
const Post=require('../models/post')
const User=require('../models/user')
const login_required=require('../middleware/login_required')

const app = new express.Router()

app.put('/connect',login_required,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{connections:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $push:{connections:req.body.followId}
          
      },{new:true}).then(result=>{
          res.send(result)
      }).catch(err=>{
          return res.status(422).send(err)
      })

    }
    )
})
app.put('/remove',login_required,(req,res)=>{
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
          
      },{new:true}).then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).send(err)
      })

    }
    )
})
app.put('/updatepic',login_required,async (req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).send({error:"pic cannot be updated"})
         }
         res.send(result)
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