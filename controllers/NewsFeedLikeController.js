const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const NewsFeedLikeService = require('../services/NewsFeedLikeService.js');
const CustomError = require('../libs/CustomError.js');
const MiddleWare = require('./MiddleWare.js');
let middleWare = new MiddleWare();
const router = express.Router({
  mergeParams: true
});

router.use(middleWare.permissionCheck);

// 특정 뉴스피드 좋아요 조회
router.get('/', (req, res, next) => {
  if (req.params.newsFeedId < 1)
    return next(new CustomError('Bad Request', 400));
  let newsFeedService = new NewsFeedService(),
    newsFeedLikeService = new NewsFeedLikeService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedLikeService.findByMemberId(req.params.newsFeedId, req.memberId);
    })
    .then((row) => row ? res.send({
      result: true
    }) : res.send({
      result: false
    }))
    .catch(next);
});

// 특정 뉴스피드 좋아요 하기
router.post('/', (req, res, next) => {
  if (req.params.newsFeedId < 1)
    return next(new CustomError('Bad Request', 400));

  let newsFeedService = new NewsFeedService(),
    newsFeedLikeService = new NewsFeedLikeService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedLikeService.findByMemberId(req.params.newsFeedId, req.memberId);
    })
    .then((row) => {
      if (!row) throw new CustomError('Forbidden', 403);
      newsFeedLikeService.create(req.params.newsFeedId, req.memberId);
    })
    .then(() => res.sendStatus(201))
    .catch(next);
});

// 특정 뉴스피드 좋아요 취소
router.delete('/', (req, res, next) => {
  if (req.params.newsFeedId < 1)
    return next(new CustomError('Bad Request', 400));

  let newsFeedService = new NewsFeedService(),
    newsFeedLikeService = new NewsFeedLikeService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedLikeService.findByMemberId(req.params.newsFeedId, req.memberId);
    })
    .then((row) => {
      if (!row) throw new CustomError('Forbidden', 403);
      newsFeedLikeService.delete(req.params.newsFeedId, req.memberId);
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
