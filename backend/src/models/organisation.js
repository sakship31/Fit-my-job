const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {ObjectId} = mongoose.Schema.Types
const {JWT_SECRET}= require('../../config/keys')
const Job =require('./job')
// const moment = require('moment-timezone');
// const dateIndia = moment.tz(Date.now(), "Asia/Calcutta");

const orgSchema=new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        required:true,
        trim: true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        trim:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    pic:{
        type:String,
        default:"https://drgsearch.com/wp-content/uploads/2020/01/no-photo.png" 
    },
    followers:[{type:ObjectId,ref:"User"}],
    about:{
      type:String,
    },
    website_link:{
      type:String,
    },
    location:{
        type:String
    },

})

orgSchema.pre('save',async function(next){
    const user=this
    
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

//used statics to query the whole collection
orgSchema.statics.findCredential=async(email,password)=>{
    const org=await Org.findOne({email})
    if(!org){
        throw new Error('Unable to login')
    }
    const check=await bcrypt.compare(password,org.password)
    if(!check){
        throw new Error('Unable to login')        
    }
    return org
}

//used methods to query a particular document
orgSchema.methods.generatetoken= async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},JWT_SECRET)
    user.tokens=user.tokens.concat({token})
    user.save()
    return token
}

//will not respond with following deleted attributes 
orgSchema.methods.toJSON = function(){
    const user=this
    const userObj=user.toObject()

    delete userObj.password

    return userObj
}
orgSchema.pre('remove',async function(next){
    const user=this
    await Job.deleteMany({postedBy:user._id})
    next()
})

var Org=mongoose.model('Org',orgSchema)

module.exports=Org
