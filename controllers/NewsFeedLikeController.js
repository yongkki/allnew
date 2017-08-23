const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const CustomError = require('../libs/CustomError.js');
const MiddleWare = require('./MiddleWare.js');
const router = express.Router({
  mergeParams: true
});

router.use(MiddleWare.permissionCheck);

// 특정 뉴스피드 좋아요 조회
router.get('/', function(req, res, next) {
  if (req.params.newsFeedId < 1) next(new CustomError('Bad Request', 400));
  NewsFeedService.findById(req.params.newsFeedId)
    .then(function(row) {
      if (!row) throw new CustomError('Bad Request', 400);
      return NewsFeedService.findNewsFeedLike(req.params.newsFeedId, req.memberId);
    })
    .then((row) => row ? res.send({
      result: true
    }) : res.send({
      result: false
    }))
    .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
});

// 특정 뉴스피드 좋아요 하기
router.post('/', function(req, res, next) {
  if (req.params.newsFeedId < 1) next(new CustomError('Bad Request', 400));

  NewsFeedService.findById(req.params.newsFeedId)
    .then(function(row) {
      if (!row) throw new CustomError('Bad Request', 400);
      return NewsFeedService.findNewsFeedLike(req.params.newsFeedId, req.memberId);
    })
    .then(function(row) {
      if (row) throw new CustomError('Bad Request', 400);
      NewsFeedService.createNewsFeedLike(req.params.newsFeedId, req.memberId);
    })
    .then(() => res.sendStatus(201))
    .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
});

// 특정 뉴스피드 좋아요 취소
router.delete('/', function(req, res, next) {
  if (req.params.newsFeedId < 1) next(new CustomError('Bad Request', 400));
  NewsFeedService.findById(req.params.newsFeedId)
    .then(function(row) {
      if (!row) throw new CustomError('Bad Request', 400);
      return NewsFeedService.findNewsFeedLike(req.params.newsFeedId, req.memberId);
    })
    .then(function(row) {
      if (!row) throw new CustomError('Bad Request', 400);
      NewsFeedService.deleteNewsFeedLike(req.params.newsFeedId, req.memberId);
    })
    .then(() => res.sendStatus(204))
    .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
});

module.exports = router;
