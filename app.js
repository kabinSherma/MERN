// importing express

const express = require('express')
const connectToDatabase = require('./database/connection')
const Book = require('./model/bookModel')
const app = express()

// to understand the json in express

app.use(express.json())

// importing multer and storage 

const {multer,storage} = require('./middleware/multerConfig')

const uploads =multer({storage:storage})




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
        filename= "http://localhost:3000/" + req.file.filename
    }

        // destructuring data form forntend 
    const {bookName,bookPrice,isbnNumber,autherName,publishedAt,publication,}=req.body
    // console.log(bookName,bookPrice,isbnNumber,autherName,publishedDate)

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

app.delete('/book/:id',uploads.single("image"),async(req,res)=>{

    const id = req.params.id
     await Book.findByIdAndDelete(id)
    res.status(200).json({
        message:"Deleted successfully"
    })

})


// update or edit API

app.patch('/book/:id',uploads.single("image"),async(req,res)=>{

    const id = req.params.id
    const {bookName,bookPrice,isbnNumber,autherName,publishedAt,publication}=req.body
   await Book.findByIdAndUpdate(id,{
        bookName,
        bookPrice,
        isbnNumber,
        publishedAt,
        publication,
        autherName
    })
    res.status(200).json({
        message:"Updated Successfully",
        
    })
})










// give the premission to read the file 
app.use(express.static("./storage/"))


app.listen(3000,()=>{
    console.log('Server started as  port 3000 ')
})