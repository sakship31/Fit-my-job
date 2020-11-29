const express=require('express')
var corS=require('cors')
require('./db/mongoose');
const app=express()
app.use(express.json())
const authRouter=require('./routers/auth')
const postRouter=require('./routers/posts')
const UserprofileRouter=require('./routers/user_profile')
const jobRouter=require('./routers/job_post')
const OrgprofileRouter=require('./routers/org_profile')

const port =process.env.PORT || 3000

app.use(corS())
app.use(authRouter)
app.use(postRouter)
app.use(UserprofileRouter)
app.use(jobRouter)
app.use(OrgprofileRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})