const express=require('express')
const User=require('../models/user')
const login_required=require('../middleware/login_required')
// const multer=require('multer')
// const sharp=require('sharp')

const app = new express.Router()


app.post('/signup',(req,res)=>{
    const user=new User(req.body)
    if(!user.email || !user.password || !user.name){
        return res.status(422).send({error:"Please add all the fields"})
     }

        User.findOne({email:user.email})
        .then(async (savedUser)=>{
            if(savedUser){
              return res.status(422).json({error:"User already exists with that email"})
            }
        await user.save()
        res.send({user})
    }).catch(error=>{
        res.status(400)
        res.send(error)
    })
})

app.post('/login',async(req,res)=>{
    if(!req.body.email || !req.body.password){
        return res.status(422).json({error:"Please add all fields"})
     }
     else{
         try{
            const user =await User.findCredential(req.body.email,req.body.password)
            const token=await user.generatetoken()
            res.send({user,token})
         }
        catch(error){
            res.status(404).send()
        }
     }
})

app.post('/logout',login_required,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

app.post('/logoutAll',login_required,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})


module.exports=app 