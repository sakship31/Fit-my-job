const jwt=require('jsonwebtoken')
const Org=require('../models/organisation')
const {JWT_SECRET}= require('../../config/keys')

const auth =async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,JWT_SECRET)
        const org=await Org.findOne({_id:decoded._id,'tokens.token':token}) 
        if(!org){
            throw new Error()
        }
        req.token=token
        req.org=org
        next()
    }catch(e){
        res.status(401).send({error:'Please authenticate'})
    }
}

module.exports=auth