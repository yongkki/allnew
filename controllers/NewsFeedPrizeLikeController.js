const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const NewsFeedPrizeService = require('../services/NewsFeedPrizeService.js');
const NewsFeedPrizeLikeService = require('../services/NewsFeedPrizeLikeService.js');
const CustomError = require('../libs/CustomError.js');
const MiddleWare = require('./MiddleWare.js');
let middleWare = new MiddleWare();
const router = express.Router({
  mergeParams: true
});

router.use(middleWare.permissionCheck);


// 특정 뉴스피드 상 좋아요 하기
router.post('/', (req, res, next) => {
  if (req.params.newsFeedId < 1 || req.params.prizeId < 1)
    return next(new CustomError('Bad Request', 400));

  let newsFeedService = new NewsFeedService(),
    newsFeedPrizeService = new NewsFeedPrizeService(),
    newsFeedPrizeLikeService = new NewsFeedPrizeLikeService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedPrizeService.findById(req.params.prizeId);
    })
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedPrizeLikeService.findByMemberId(req.params.prizeId, req.memberId);
    })
    .then((row) => {
      if (row) throw new CustomError('Bad Request', 400);
      return newsFeedPrizeLikeService.create(req.params.prizeId, req.memberId);
    })
    .then((result) => res.sendStatus(201))
    .catch(next);
});

// 특정 뉴스피드 상 좋아요 취소
router.delete('/', (req, res, next) => {
  if (req.params.newsFeedId < 1 || req.params.prizeId < 1)
    return next(new CustomError('Bad Request', 400));

  let newsFeedService = new NewsFeedService(),
    newsFeedPrizeService = new NewsFeedPrizeService(),
    newsFeedPrizeLikeService = new NewsFeedPrizeLikeService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedPrizeService.findById(req.params.prizeId);
    })
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedPrizeLikeService.findByMemberId(req.params.prizeId, req.memberId);
    })
    .then((row) => {
      if (!row) throw new CustomError('Forbidden', 403);
      return newsFeedPrizeLikeService.delete(req.params.prizeId, req.memberId);
    })
    .then((result) => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
