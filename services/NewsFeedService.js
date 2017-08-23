const NewsFeed = require('../models').NewsFeed;
const NewsFeedImage = require('../models').NewsFeedImage;
const NewsFeedLike = require('../models').NewsFeedLike;
const NewsFeedPrize = require('../models').NewsFeedPrize;
const NewsFeedPrizeLike = require('../models').NewsFeedPrizeLike;
const NewsFeedReply = require('../models').NewsFeedReply;

class NewsFeedService {

  /*
  =======================================
  뉴스피드 조회 관련
  =======================================
  */

  // 뉴스피드 목록 조회
  static findAll() {
    return NewsFeed.findAll();
  }

  // 특정 뉴스피드 조회
  static findById(newsFeedId) {
    return NewsFeed.findOne({
      where: {
        id: newsFeedId
      }
    });
  }


  /*
  =======================================
  좋아요 관련
  =======================================
  */

  // 특정 뉴스피드 좋아요 정보 조회(사용자)
  static findNewsFeedLike(newsFeedId, memberId) {
    return NewsFeedLike.findOne({
      where: {
        newsFeedId: newsFeedId,
        memberId: memberId
      }
    });
  }

  // 특정 뉴스피드 좋아요 하기
  static createNewsFeedLike(newsFeedId, memberId) {
    return NewsFeedLike.create({
      newsFeedId: newsFeedId,
      memberId: memberId
    }).then(NewsFeed.increment('like_count', {
      by: 1,
      where: {
        id: newsFeedId
      }
    }));
  }

  // 특정 뉴스피드 좋아요 삭제
  static deleteNewsFeedLike(newsFeedId, memberId) {
    return NewsFeedLike.destroy({
      where: {
        newsFeedId: newsFeedId,
        memberId: memberId
      }
    }).then(NewsFeed.increment('like_count', {
      by: -1,
      where: {
        id: newsFeedId
      }
    }));
  }


  /*
  =======================================
  댓글 관련
  =======================================
  */


  // 특정 뉴스피드 특정 댓글 조회(사용자)
  static findOneReplyByNewsFeedId(replyId, memberId) {
    console.log(replyId, memberId);
    return NewsFeedReply.findOne({
      where: {
        id: replyId,
        memberId: memberId

      }
    });
  }


  // 특정 뉴스피드 댓글 조회
  static findReplyByNewsFeedId(newsFeedId) {
    return NewsFeedReply.findAll();
  }

  // 특정 뉴스피드 댓글 등록
  static createReply(content, newsFeedId, memberId) {
    return NewsFeedReply.create({
      content: content,
      newsFeedId: newsFeedId,
      memberId: memberId
    }).then(NewsFeed.increment('reply_count', {
      by: 1,
      where: {
        id: newsFeedId
      }
    }));
  }

  // 특정 뉴스피드 댓글 수정
  static updateReply(replyId, content) {
    return NewsFeedReply.update({
      content: content
    }, {
      where: {
        id: replyId
      }
    });
  }

  // 특정 뉴스피드 댓글 삭제
  static deleteReply(replyId, newsFeedId) {
    return NewsFeedReply.destroy({
      where: {
        id: replyId
      }
    }).then(NewsFeed.increment('reply_count', {
      by: -1,
      where: {
        id: newsFeedId
      }
    }));
  }

  /*
  =======================================
  상 관련
  =======================================
  */

  // 특정 뉴스피드 상 조회
  static findPrizeByNewsFeedId() {

  }

}

module.exports = NewsFeedService;
