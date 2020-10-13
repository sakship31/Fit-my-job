const express=require('express')
const Post=require('../models/post')
const User=require('../models/user')
const login_required=require('../middleware/login_required')
const { json } = require('body-parser')

const app = new express.Router()

//user specific posts (self and other users)
app.get('/profile/:id',login_required,(req,res)=>{
    Post.find({_id:req.params.id})
    .populate("_id","_id name email pic connections")
    //.populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{       
        User.find({_id:req.params.id})
        .populate("_id","_id name email pic connections")
        .then((user)=>{
            return res.send({posts,user})
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })   
})

//create post with pic and caption
app.post('/createpost/pic',login_required,async (req,res)=>{
    const {caption,pic} = req.body 
    if(!caption || !pic){
      return  res.status(422).json({error:"Please add all the fields"})
    }
    const post = new Post({
        caption,
        pic,
        postedBy:req.user
    })
    try{
        await post.save()
        res.status(201).send(post)
    }catch(e){
        res.status(400)
        res.send(e)        
    }

})

//create post with written article
app.post('/createpost/article',login_required,async (req,res)=>{
    const {article} = req.body 
    if(!article){
      return  res.status(422).json({error:"Please add all the fields"})
    }
    const post = new Post({
        article,
        postedBy:req.user
    })
    try{
        await post.save()
        res.status(201).send(post)
    }catch(e){
        res.status(400)
        res.send(e)        
    }
})

//posts by logged in user's connections
app.get('/networkposts',login_required,(req,res)=>{
    // if postedBy in connections of the requested user
    // Post.find({postedBy:{$in:req.user.connections}})
    Post.find({$and:[{postedBy:{$in:req.user.connections}},{postedBy:req.user._id}]})
    .populate("postedBy","_id name pic")
    .populate("comments.postedBy","_id name pic")
    .sort('-createdAt')
    .then(posts=>{
        res.send({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

app.put('/like',login_required,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name pic")
    .populate("postedBy","_id name pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).send(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/unlike',login_required,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name pic")
    .populate("postedBy","_id name pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).send(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/comment',login_required,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).send(err)
        }else{
            res.send(result)
        }
    })
})


app.delete('/post/:id',login_required,async (req,res)=>{
    try{
        //const user=await Task1.findByIdAndDelete(req.params.id)
        const post=await Post.findOneAndDelete({_id:req.params.id,postedBy:req.user._id})
        if(!post){
            return res.status(404).send()
        }
        res.send(post)
    }catch{
        return res.status(500).send()
    }
})


module.exports=app 