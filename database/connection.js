// impoering mongoose
const mongoose=require('mongoose')

// url of database 
const connectionString="mongodb+srv://kabinsherma:kabin123@cluster0.13dyz8s.mongodb.net/?appName=Cluster0"

// function to connect to database

async function connectToDatabase(){
    await mongoose.connect(connectionString)
    console.log("connection to databse is successful")
}


// exporting the function connectToDatabase
module.exports=connectToDatabase

