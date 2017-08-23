const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const CustomError = require('../libs/CustomError.js');
const MiddleWare = require('./MiddleWare.js');
const router = express.Router({
  mergeParams: true
});

// 특정 뉴스피드 댓글 조회
router.get('/', function(req, res, next) {
  if (req.params.newsFeedId < 1) next(new CustomError('Bad Request', 400));
  NewsFeedService.findReplyByNewsFeedId()
    .then((rows) => (rows.length > 0) ? res.send(rows) : res.sendStatus(204))
    .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
});

router.use(MiddleWare.permissionCheck);

// 특정 뉴스피드 댓글 작성
router.post('/', function(req, res, next) {
  if (req.params.newsFeedId < 1) next(new CustomError('Bad Request', 400));
  NewsFeedService.createReply(req.body.content, req.params.newsFeedId, req.memberId)
    .then((result) => res.status(201).send({
      replyId: result.dataValues.id
    }))
    .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
});

// 특정 뉴스피드 댓글 수정
router.put('/:replyId', function(req, res, next) {
  if (req.params.newsFeedId < 1) next(new CustomError('Bad Request', 400));
  NewsFeedService.findOneReplyByNewsFeedId(req.params.replyId, req.memberId)
    .then(function(row) {
      if (!row) throw new CustomError('Forbidden', 403);
      return NewsFeedService.updateReply(req.params.replyId, req.body.content);
    })
    .then((result) => res.sendStatus(204))
    .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
});

// 특정 뉴스피드 댓글 삭제
router.delete('/:replyId', function(req, res, next) {
    if (req.params.newsFeedId < 1) next(new CustomError('Bad Request', 400));
    NewsFeedService.findOneReplyByNewsFeedId(req.params.replyId, req.memberId)
      .then(function(row) {
        if (!row) throw new CustomError('Forbidden', 403);
        return NewsFeedService.deleteReply(req.params.replyId, req.params.newsFeedId);
      })
      .then((result) => res.sendStatus(204))
      .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
});

module.exports = router;
