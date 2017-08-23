const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const CustomError = require('../libs/CustomError.js');
const MiddleWare = require('./MiddleWare.js');
const router = express.Router({
  mergeParams: true
});

// 특정 뉴스피드 상 조회
router.get('/', function(req, res, next) {
  if (req.params.newsFeedId < 1) next(new CustomError('Bad Request', 400));
  NewsFeedService.findById(req.params.newsFeedId)
    .then(function(row) {
      if (!row) throw new CustomError('Bad Request', 400);
      return NewsFeedService.findPrizeByNewsFeedId(req.params.newsFeedId);
    })
    .then((rows) => (rows.length > 0) ? res.send(rows) : res.sendStatus(204))
    .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
});

router.use(MiddleWare.permissionCheck);

// 특정 뉴스피드 상 등록
router.post('/', function(req, res, next) {
  if (req.params.newsFeedId < 1) next(new CustomError('Bad Request', 400));
  NewsFeedService.findById(req.params.newsFeedId)
    .then(function(row) {
      if (!row) throw new CustomError('Bad Request', 400);
      return NewsFeedService.createPrize(req.body.prizeName, req.params.newsFeedId, req.memberId);
    })
    .then((result) => res.sendStatus(201))
    .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
});

module.exports = router;
