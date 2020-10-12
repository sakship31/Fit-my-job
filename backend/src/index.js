const express=require('express')
var corS=require('cors')
require('./db/mongoose');
const app=express()
app.use(express.json())
const authRouter=require('./routers/auth')
const postRouter=require('./routers/posts')
const profileRouter=require('./routers/profile')

const port =process.env.PORT || 3000

app.use(corS())
app.use(authRouter)
app.use(postRouter)
app.use(profileRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})