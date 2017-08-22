const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const router = express.Router();

// 뉴스피드 목록 조회
router.get('/', function(req, res, next) {
});

// 특정 뉴스피드 조회
router.get('/:newsFeedId', function(req, res, next) {
});

module.exports = router;
