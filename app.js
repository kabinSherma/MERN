// importing express

const express = require('express')
const connectToDatabase = require('./database/connection')
const app = express()




connectToDatabase()


app.get('/',(request,response)=>{
    response.status(200). json({
        message:"sccuess"
    })
})


















app.listen(3000,()=>{
    console.log('Server started as  port 3000 ')
})