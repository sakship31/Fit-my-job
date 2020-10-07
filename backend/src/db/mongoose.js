const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/fit-my-job-api",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false 
}).then(()=>{
    console.log("MongoDB connected successfully")
}).catch((err)=>{
    console.log("Error has occurred while connecting to the database: ",err);
})

