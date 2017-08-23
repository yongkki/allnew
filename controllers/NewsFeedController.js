const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const router = express.Router({mergeParams: true});

// 뉴스피드 목록 조회
router.get('/', function(req, res, next) {
  NewsFeedService.findAll()
  .then((row) => (row.length > 0) ? res.send(rows) : res.sendStatus(204))
  .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
});

// 특정 뉴스피드 조회
router.get('/:newsFeedId', function(req, res, next) {
  if (req.params.newsFeedId < 1) next(new CustomError('Bad Request', 400));
  NewsFeedService.findById(req.params.newsFeedId)
  .then((row) => (row) ? res.send(row) : res.sendStatus(404))
  .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
});

module.exports = router;
