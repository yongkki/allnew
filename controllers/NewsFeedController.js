const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const router = express.Router({
  mergeParams: true
});

// 뉴스피드 목록 조회
router.get('/', (req, res, next) => {

  let newsFeedService = new NewsFeedService();

  newsFeedService.findAll()
    .then((row) => (row.length > 0) ? res.send(rows) : res.sendStatus(204))
    .catch(next);
});

// 특정 뉴스피드 조회
router.get('/:newsFeedId', (req, res, next) => {
  if (req.params.newsFeedId < 1)
    return next(new CustomError('Bad Request', 400));

  let newsFeedService = new NewsFeedService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => (row) ? res.send(row) : res.sendStatus(404))
    .catch(next);
});

module.exports = router;
