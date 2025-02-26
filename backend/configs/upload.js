const multer = require('multer');
const path = require('path');
const peth = require('path');
const BaseErrors = require('../errors/base.error');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb)=>{
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const isValidMime = allowedTypes.test(file.mimetype);
    if(extname  && isValidMime){
        return cb(null,true);
    } else {
        return cb(BaseErrors.BadRequest("Only images are allowed"),false);
    }
}

const upload=multer({
    storage,
    limits: {fileSize : 10 * 1024 * 1024},
    fileFilter
});
module.exports=upload;