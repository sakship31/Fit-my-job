const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const jobSchema = new mongoose.Schema({
    caption: {
        type: String,
    },
    pic: {
        type: String,
    },
    article: {
        type: String,
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "User" }
    }],
    postedBy: {
        type: ObjectId,
        ref: "Org"
    }
}, { timestamps: true })

const Job = mongoose.model('Job', jobSchema)
module.exports = Job
