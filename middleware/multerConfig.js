// requiring multer
const multer =require("multer")

const storage = multer.diskStorage({
   
    destination:function(req,file,cb){
        // console.log(file.mimetype)
       const  allowFileType = ['image/png','image/jpg','image/jpeg']
        if (!allowFileType.includes(file.mimetype)){
            
            cb(new Error("This type of file does not supported "))
            return
        }
        cb(null,'./storage') // cb(error,success) call back
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname)
    }
});

// const fileFilter = function (res,file,cb) {
//     const allowImageFile = ['image/jpg','image/png','image/jpeg']
//     if(!allowImageFile.includes(file.mimetype)){
//        return cb(new Error ("This file dose note support"))
//     }
// }
// const uploads = multer({
//     storage : storage ,
//     limits :{
//         fileSize : 1 * 1024 * 1024 
//     },
//     fileFilter : fileFilter
// })



// exporting multer and diskStorage

module.exports = {multer,storage}
