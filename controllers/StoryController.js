const express = require('express');
const SignService = require('../services/SignService.js');
const StoryService = require('../services/StoryService.js');
const ImageService = require('../services/ImageService.js');
const CustomError = require('../libs/CustomError.js');
const router = express.Router();

// 사연 제보
router.post('/', function(req, res, next) {
  let memberId;
  SignService.jwtVerify(req.headers.authorization)
  .then(function(memberData){
    memberId = memberData.id;
    return ImageService.uploads(req, res, 'images');
  })
  .then(function(){
    req.body.memberId = memberId;
    return StoryService.create(req.body);
  })
  .then((story) => StoryService.createImages(req.files, story.dataValues.id))
  .then(()=>res.sendStatus(201))
  .catch(function(error) {
    console.log(error);
    next(new CustomError(error.message || error, error.status || 500));
  });
});

module.exports = router;
