const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const jobSchema = new mongoose.Schema({
    job_title: {
        type: String,
    },
    job_description: {
        type: String,
    },
    skills_required: {
        type: String,
    },
    location: {
        type: String,
    },
    applicants: [{
        type: ObjectId,
         ref: "User" 
    }],
    start_date:{
        type:String
    },
    end_date:{
        type:String
    },
    apply_by:{
        type:String
    },
    postedBy: {
        type: ObjectId,
        ref: "Org"
    }
}, { timestamps: true })

const Job = mongoose.model('Job', jobSchema)
module.exports = Job
