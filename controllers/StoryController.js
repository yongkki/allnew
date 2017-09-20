const express = require('express');
const StoryService = require('../services/StoryService.js');
const ImageService = require('../services/ImageService.js');
const CustomError = require('../libs/CustomError.js');
const MiddleWare = require('./MiddleWare.js');
let middleWare = new MiddleWare();
const router = express.Router();

router.use(middleWare.permissionCheck);

// 사연 제보
router.post('/', new ImageService().uploads('images'), (req, res, next) => {
  let storyService = new StoryService();
  storyService.create(req.body, req.files, req.memberId)
    .then(() => res.sendStatus(201))
    .catch(next);
});

module.exports = router;
