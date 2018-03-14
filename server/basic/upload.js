const multer  = require('multer');
const path = require("path");
const fs = require("fs");
const mime = require("mime");
const uploadPath = path.join(__dirname,'../uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try{
            fs.accessSync(uploadPath);
        }catch(e){
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null,  `${Date.now()}.${mime.getExtension(file.mimetype)}`)
    }
});
const upload = multer({ storage: storage });
module.exports = {
    upload,
};


