//  requiring mongooes

const mongoose=require ('mongoose')

// making table or field structure


const bookSchema = new mongoose.Schema ({
    bookName:{
        type:String,
        unique:true // only one book of the name 
    },
    bookPrice : {
        type:Number
    },
    isbnNumber : {
        type :Number
    },
    autherName :{
        type:String
    },
    publishedAt:{
        type:String
    },
    publication:{
        type:String
    },
    imageUrl:{
        type:String 
    }

})
 
// table name & final output
const Book = mongoose.model("Book",bookSchema)

// exporting book

module.exports = Book 