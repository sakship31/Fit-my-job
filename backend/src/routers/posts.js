const express = require('express')
const Post = require('../models/post')
const User = require('../models/user')
const login_required = require('../middleware/login_required')
const { json } = require('body-parser')
const multer=require('multer')
const sharp=require('sharp')

const app = new express.Router()

//user specific posts (self and other users)
app.get('/profile/:id', login_required, (req, res) => {
    // console.log(req.params.id)
    Post.find({postedBy:req.params.id})
        .populate("_id", "_id name email pic connections")
        //.populate("comments.postedBy","_id name")
        .sort('-createdAt')
        .then((posts) => {
            // console.log("posts-",posts)
            User.find({ _id: req.params.id })
                .populate("_id", "_id name email pic connections")
                .then((user) => {
                    return res.send({ posts, user })
                }).catch(err => {
                    console.log(err)
                })
        }).catch(err => {
            console.log(err)
        })
})

const upload=multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(PNG|jpg|jpeg)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined,true)
    }
})

//create post with pic and caption
// app.post('/createpost/pic', login_required,upload.single('image'), async (req, res) => {
//     const caption= req.body.caption
//     const image=req.file

//     console.log("again:",req.body.image)
//     console.log("req body--",req.body)
//     // console.log("file:--",req.body.pic.get("x"))
//     console.log("req file--",req.file)
//     console.log("req image-",req.image)
//     if (!caption || !image) {
//         return res.status(422).json({ error: "Please add all the fields" })
//     }
//     pic=await sharp(image.buffer).resize({width:250,height:250}).png().toBuffer()
//     const post = new Post({
//         caption,
//         pic,
//         postedBy: req.user
//     })
//     try {
//         await post.save()
//         res.status(201).send(post)
//     } catch (e) {
//         res.status(400)
//         res.send(e)
//     }
// })

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
app.post('/createpost/article', login_required, async (req, res) => {
    const { article } = req.body
    if (!article) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    const post = new Post({
        article,
        postedBy: req.user
    })
    try {
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        res.status(400)
        res.send(e)
    }
})

//posts by logged in user's connections
app.get('/networkposts', login_required, (req, res) => {
    //console.log("CONNECTIONS=",req.user.connections)
    // if postedBy in connections of the requested user
    Post.find({postedBy:{$in:req.user.connections}})
    // Post.find({ $and: [{ postedBy: { $in: req.user.connections } }, { postedBy: req.user._id }] })
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name pic")
        .sort('-createdAt')
        .then(posts => {
            res.send({ posts })
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/like', login_required, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name pic")
        .populate("postedBy", "_id name pic")
        .exec((err, result) => {
            if (err) {
                return res.status(422).send(err)
            } else {
                res.send(result)
            }
        })
})

app.post('/unlike', login_required, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name pic")
        .populate("postedBy", "_id name pic")
        .exec((err, result) => {
            if (err) {
                return res.status(422).send(err)
            } else {
                res.send(result)
            }
        })
})

app.post('/comment', login_required, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name pic")
        .exec((err, result) => {
            if (err) {
                return res.status(422).send(err)
            } else {
                res.send(result)
            }
        })
})


app.delete('/post/:id', login_required, async (req, res) => {
    try {
        //const user=await Task1.findByIdAndDelete(req.params.id)
        const post = await Post.findOneAndDelete({ _id: req.params.id, postedBy: req.user._id })
        if (!post) {
            return res.status(404).send()
        }
        res.send(post)
    } catch {
        return res.status(500).send()
    }
})


module.exports = app 