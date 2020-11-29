const express = require('express')
const Post = require('../models/post')
const User = require('../models/user')
const login_required = require('../middleware/login_required')
const login_required2 = require('../middleware/org_login_req')
const { json } = require('body-parser')
const app = new express.Router()

//user profile (self and other users)
app.get('/profile/:id', login_required, (req, res) => {
    Post.find({postedBy:req.params.id})
        .populate("_id", "_id name email pic connections")
        .sort('-createdAt')
        .then((posts) => {
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

//user profile (self and other users) for org to view
app.get('/profile/c/:id', login_required2, (req, res) => {
    Post.find({postedBy:req.params.id})
        .populate("_id", "_id name email pic connections")
        .sort('-createdAt')
        .then((posts) => {
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

//posts by logged in user's connections
app.get('/networkposts', login_required, (req, res) => {
    Post.find({postedBy:{$in:req.user.connections}})
        .populate("postedBy", "_id name pic")
        .sort('-createdAt')
        .then(posts => {
            User.find({_id:req.user._id})
            .populate("_id","name email connections")
            .then(user=>{
                res.send({ posts,user})
            })      
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
        const post = await Post.findOneAndDelete({ _id: req.params.id, postedBy: req.user._id })
        if (!post) {
            return res.status(404).send()
        }
        res.send(post)
    } catch {
        return res.status(500).send()
    }
})

/////////////////////////////////////////
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


module.exports = app 