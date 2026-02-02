// importing express

const express = require('express')
const connectToDatabase = require('./database/connection')
const Book = require('./model/bookModel')
const app = express()
const fs =require('fs')

// require cors

const cors = require('cors')

// 

app.use(cors({
    origin:"*"
}))

// to understand the json in express

// app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// importing multer and storage 

const {multer,storage} = require('./middleware/multerConfig')
const { log } = require('console')

const uploads =multer({storage:storage});



connectToDatabase()


app.get('/',(request,response)=>{
    response.status(200). json({
        message:"sccuess"
    })
})


// creating create api

app.post('/book',uploads.single("image"),async(req,res)=>{
    // console.log(req.file)
    let filename ;
    
    if(!req.file){
        filename = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s"
    }
    else {
        filename="http://localhost:3000/" + req.file.filename
    }

        // destructuring data form forntend 
    const {bookName,bookPrice,isbnNumber,autherName,publishedAt,publication,}=req.body
    // console.log(bookName,bookPrice,isbnNumber,autherName,publishedAt,publication)

    // putting the data into the structrure 

    await Book.create({
        bookName:bookName,
        bookPrice:bookPrice,
        isbnNumber:isbnNumber,
        autherName:autherName,
        publishedAt:publishedAt,
        publication:publication,
        imageUrl : filename
    })
console.log(req.files)
    // message after book is created successfully

    res.status(201).json({
        message:'Book created successfully'
    })
})



// get /read api


app.get('/book',async(req,res)=>{

  const books= await  Book.find()  // return in array
  res.status(200).json({
    message:"Books fetched successufully",
    data:books
  })
})


// single read API


app.get('/book/:id',async(req,res)=>{

    const id = req.params.id
    const book = await Book.findById (id)  // return in object
  if (!book ){
   res.status(404).json({
    message:"Book not found"
   })
  }
  else{
    res.status(200).json({
        message:"Single book fetched successfully",
        data: book
    })
    
  }

})


// delete api

app.delete('/book/:id',async(req,res)=>{


    const id = req.params.id
    const oldDatas= await Book.findById(id)

    if(oldDatas){
        const oldImagePath = oldDatas.imageUrl
        const oldImageUrl = "http://localhost:3000/".length
        const newOldImage = oldImagePath.slice(oldImageUrl)
        console.log(newOldImage)
        fs.unlink('./storage/'+ newOldImage,(err)=>{
            if(err){
                console.log(err)
            }
            else {
                console.log("Image Deleted")
            }
        })
    }



     await Book.findByIdAndDelete(id)
    res.status(200).json({
        message:"Deleted successfully"
    })

})


// update or edit API

app.patch('/book/:id',uploads.single("image"),async(req,res)=>{

    const id = req.params.id
    const {bookName,bookPrice,isbnNumber,autherName,publishedAt,publication}=req.body
    // updateing image 

    const oldDatas= await Book.findById(id)
    let filename;
    if(req.file){
        const oldImagePath = oldDatas.imageUrl
        
        const lengthOfOldImagePath = "http://localhost:3000/".length
        
        const newOldImagePath = oldImagePath.slice(lengthOfOldImagePath)
        

        fs.unlink('./storage/'+ newOldImagePath,(err) =>{
            if(err){
                console.log(err)
            }
            else {
                console.log("File deleted successfully")
            }
        })
        filename= "http://locallhost:3000/" + req.file.filename
    }
    else {

    }

   await Book.findByIdAndUpdate(id,{
        bookName,
        bookPrice,
        isbnNumber,
        publishedAt,
        publication,
        autherName,
        imageUrl:filename
    })
    res.status(200).json({
        message:"Updated Successfully",
        
    })
});









// give access to read the file 
app.use(express.static("./storage/"))


app.listen(3000,()=>{
    console.log('Server started as  port 3000 ')
})