const express = require('express');
const StoryService = require('../services/StoryService.js');
const ImageService = require('../services/ImageService.js');
const CustomError = require('../libs/CustomError.js');
const MiddleWare = require('./MiddleWare.js');
const router = express.Router();

router.use(MiddleWare.permissionCheck);

// 사연 제보
router.post('/', ImageService.uploads('images'), function(req, res, next) {
  StoryService.create(req.body, req.memberId)
    .then((story) => StoryService.createImages(req.files, story.dataValues.id))
    .then(() => res.sendStatus(201))
    .catch(function(error) {
      next(new CustomError(error.message || error, error.status || 500));
    });
});

module.exports = router;
