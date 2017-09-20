const express = require('express');
const NewsFeedService = require('../services/NewsFeedService.js');
const NewsFeedReplyService = require('../services/NewsFeedReplyService.js');
const CustomError = require('../libs/CustomError.js');
const MiddleWare = require('./MiddleWare.js');
let middleWare = new MiddleWare();
const router = express.Router({
  mergeParams: true
});


// 특정 뉴스피드 댓글 조회
router.get('/', (req, res, next) => {
  if (req.params.newsFeedId < 1)
    return next(new CustomError('Bad Request', 400));

  let newsFeedService = new NewsFeedService(),
    newsFeedReplyService = new NewsFeedReplyService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedReplyService.findByNewsFeedId(req.params.newsFeedId);
    })
    .then((rows) => (rows.length > 0) ? res.send(rows) : res.sendStatus(204))
    .catch(next);
});

router.use(middleWare.permissionCheck);

// 특정 뉴스피드 댓글 작성
router.post('/', (req, res, next) => {
  if (req.params.newsFeedId < 1)
    return next(new CustomError('Bad Request', 400));

  let newsFeedService = new NewsFeedService(),
    newsFeedReplyService = new NewsFeedReplyService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedReplyService.create(req.body.content, req.params.newsFeedId, req.memberId);
    })
    .then((result) => res.status(201).send({
      replyId: result.dataValues.id
    }))
    .catch(next);
});

// 특정 뉴스피드 댓글 수정
router.put('/:replyId', (req, res, next) => {
  if (req.params.newsFeedId < 1)
    return next(new CustomError('Bad Request', 400));

  let newsFeedService = new NewsFeedService(),
    newsFeedReplyService = new NewsFeedReplyService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedReplyService.findByMemberId(req.params.replyId, req.memberId);
    })
    .then((row) => {
      if (!row) throw new CustomError('Forbidden', 403);
      return newsFeedReplyService.update(req.params.replyId, req.body.content);
    })
    .then((result) => res.sendStatus(204))
    .catch(next);
});

// 특정 뉴스피드 댓글 삭제
router.delete('/:replyId', (req, res, next) => {
  if (req.params.newsFeedId < 1)
    return next(new CustomError('Bad Request', 400));

  let newsFeedService = new NewsFeedService(),
    newsFeedReplyService = new NewsFeedReplyService();

  newsFeedService.findById(req.params.newsFeedId)
    .then((row) => {
      if (!row) throw new CustomError('Bad Request', 400);
      return newsFeedReplyService.findByMemberId(req.params.replyId, req.memberId);
    })
    .then((row) => {
      if (!row) throw new CustomError('Forbidden', 403);
      return newsFeedReplyService.delete(req.params.replyId, req.params.newsFeedId);
    })
    .then((result) => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
