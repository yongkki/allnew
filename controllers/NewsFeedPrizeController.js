const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const NewsFeedPrizeService = require('../services/NewsFeedPrizeService.js');
const CustomError = require('../libs/CustomError.js');
const MiddleWare = require('./MiddleWare.js');
let middleWare = new MiddleWare();
const router = express.Router({
  mergeParams: true
});


// 특정 뉴스피드 상 조회
router.get('/', (req, res, next) => {
  if (req.params.newsFeedId < 1)
    return next(new CustomError('Bad Request', 400));

  let newsFeedService = new NewsFeedService(),
    newsFeedPrizeService = new NewsFeedPrizeService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedPrizeService.findByNewsFeedId(req.params.newsFeedId);
    })
    .then((rows) => (rows.length > 0) ? res.send(rows) : res.sendStatus(204))
    .catch(next);
});

router.use(middleWare.permissionCheck);

// 특정 뉴스피드 상 등록
router.post('/', (req, res, next) => {
  if (req.params.newsFeedId < 1)
    return next(new CustomError('Bad Request', 400));

  let newsFeedService = new NewsFeedService(),
    newsFeedPrizeService = new NewsFeedPrizeService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedPrizeService.create(req.body.prizeName, req.params.newsFeedId, req.memberId);
    })
    .then((result) => res.sendStatus(201))
    .catch(next);
});

module.exports = router;
