// requiring multer
const multer =require("multer")

const storage = multer.diskStorage({
    
    destination:function(req,file,cb){
        // console.log(file.mimetype)
        const allowedImages = ['image/png','image/jpeg','image/jpg']
        // const imageSize = file.size
        if (!allowedImages.includes(file.mimetype) ){
            cb(new Error("This file types is not supported"))
            return 
        }
        cb(null,'./storage') // cb(error,success) call back
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname)
    }
});




// exporting multer and diskStorage

module.exports = {multer,storage}