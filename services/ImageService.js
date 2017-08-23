const multer = require('multer');
const randomstring = require("randomstring");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, randomstring.generate() + Date.now().toString() + "." + file.originalname.split('.').pop());
  }
});

class ImageService {

  // 이미지 업로드
  static uploads(req, res, fieldName) {
    return new Promise(function(resolve, reject){
      multer({storage: storage}).array(fieldName, 20)(req, res, function(error){
        if (error)
          reject(error);
        else
          resolve();
      });
    });
  }
}

module.exports = ImageService;
