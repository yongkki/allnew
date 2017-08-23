const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const router = express.Router({mergeParams: true});

// 뉴스피드 목록 조회
router.get('/', function(req, res, next) {
  // TODO: 유효성 체크
  NewsFeedService.findAll()
  .then(function(rows){
    res.send(rows);
  })
  .catch(function(error){
    next(new CustomError(error.message || error, error.status || 500));
  });
});

// 특정 뉴스피드 조회
router.get('/:newsFeedId', function(req, res, next) {
  NewsFeedService.findById(req.params.newsFeedId)
  .then(function(row){
    res.send(row);
  })
  .catch(function(error){
    next(new CustomError(error.message || error, error.status || 500));
  });
});

module.exports = router;
