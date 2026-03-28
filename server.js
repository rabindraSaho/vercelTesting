const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const ConnectDB = require('./Connection/MongoDBConnection');
const TestRouter = require('./Router/Router');

dotenv.config();
const PORT = process.env.PORT
let app = express()
app.use(express.json())

app.use(cors({
    origin : '*',
    // origin : (origin,callback)=>{
    //     const allowedOrigins = [app.use()
    //         'http://localhost:3000',
    //         'http://localhost:5173'
    //     ]
    //     if(!origin || allowedOrigins.includes(origin)){
    //         callback(null,true)
    //     }else{
    //         callback(new Error(`CORS Origin Policy Violation : Origin not Allowed! ${origin}`))
    //     }
    // },
    methods : ['GET','POST','DELETE','PUT'],
    // credentials : true,
    allowedHeaders :['Content-Type','Authorization'],
    optionsSuccessStatus : 200
}))
app.use('/api',TestRouter)


app.listen(PORT,()=>{
    console.log(`Server Running on PORT : ${PORT} `)
    ConnectDB()
})