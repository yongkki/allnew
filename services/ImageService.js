const multer = require('multer');
const randomstring = require("randomstring");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, randomstring.generate() + Date.now().toString() + "." + file.originalname.split('.').pop());
  }
});

class ImageService {
  // 이미지 업로드
  uploads(fieldName) {
    return multer({
      storage: storage
    }).array(fieldName, 20);
  }
}

module.exports = ImageService;
