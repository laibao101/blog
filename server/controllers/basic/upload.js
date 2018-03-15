const multer  = require('multer');
const path = require("path");
const fs = require("fs");
const mime = require("mime");
const Router = require('express').Router;
const {requireLogin} = require("./auth");
const router = new Router();

const uploadPath = path.join(__dirname,'../../uploads');
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

router.post('/img',upload.single('img'), async (req, res, next) => {
    try {
        const imgUrl = path.join('\\static', req.file.filename);
        res.json({
            code: 0,
            msg: '上传成功',
            data:{
                imgUrl,
                originalname: req.file.originalname,
                size: req.file.size
            }
        });
    }catch (err){
        next(err);
    }

});
module.exports = {
    upload,
    init: function (app) {
        app.use('/api',requireLogin, router)
    }
};


