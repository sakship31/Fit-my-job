const express=require('express')
const User=require('../models/user')
const login_required=require('../middleware/login_required')
// const multer=require('multer')
// const sharp=require('sharp')

const app = new express.Router()


app.post('/signup',(req,res)=>{
    // console.log("body-",req.body)
    const user=new User(req.body)
    // console.log("user=",user)
    if(!user.email || !user.password || !user.name){
        return res.status(422).send({message:"Please add all the fields"})
     }

        User.findOne({email:user.email})
        .then(async (savedUser)=>{
            if(savedUser){
              return res.status(422).json({message:"User already exists with that email"})
            }
        // console.log("lol")    
        await user.save()
        res.json({user})
    }).catch(error=>{
        // console.log("error")
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
            res.json({user,token})
         }
        catch(error){
            res.status(404).send()
        }
     }
})

app.get('/users',async (req,res)=>{
    try{
        const user=await User.find({},function(err,data){
            if (err) throw error;
            console.log(data);
           
        })
           res.send(user)
       }catch(e){
           return res.status(500).send(e)
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