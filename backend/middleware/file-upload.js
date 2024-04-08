
const uuid = require('uuid/v1')
const multer = require("multer");
const MEME_TYPE_MAP = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
    'image/png' : 'png'
}
const fileUpload = multer({
    limits : 500000,
    storage : multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, 'uploads/image')

        },
        filename : (req, file, cb) => {
            const ext = MEME_TYPE_MAP[file.mimetype];
            cb(null, uuid() +'.'+ ext);
        }
    }),
    fileFilter : (req, file, cb) => {
        const isValid = !! MEME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid Meme type');
        cb(error, isValid);
    }
})

module.exports = fileUpload;