const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const router = express.Router();

// 특정 뉴스피드 좋아요 조회
router.get('/', function(req, res, next) {
});

// 특정 뉴스피드 좋아요 하기
router.post('/', function(req, res, next) {
});

// 특정 뉴스피드 좋아요 취소
router.delete('/', function(req, res, next) {
});

module.exports = router;
