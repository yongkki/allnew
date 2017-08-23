const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const router = express.Router();

// 특정 뉴스피드 댓글 조회
router.get('/', function(req, res, next) {
});

// 특정 뉴스피드 댓글 작성
router.post('/', function(req, res, next) {
});

// 특정 뉴스피드 댓글 수정
router.put('/:replyId', function(req, res, next) {
});

// 특정 뉴스피드 댓글 삭제
router.delete('/:replyId', function(req, res, next) {
});

module.exports = router;
