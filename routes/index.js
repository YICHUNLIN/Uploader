var express = require('express');
var api = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './resource')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(-4))
  }
})

const fileter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};

var upload = multer(
  {
    storage
  }
);

api.post('/',
  upload.single('image'), 
  (req, res, next) => {
      if (!req.file) return res.status(400).json({message: 'not found image.'});
      return next();
  },
  (req, res) => {
  return res.status(200).json({
      name: req.file.filename,
      path: req.file.path
  })
});

module.exports = api;
