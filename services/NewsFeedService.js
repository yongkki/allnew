const NewsFeed = require('../models').NewsFeed;
const NewsFeedImage = require('../models').NewsFeedImage;
const NewsFeedLike = require('../models').NewsFeedLike;
const NewsFeedPrize = require('../models').NewsFeedPrize;
const NewsFeedPrizeLike = require('../models').NewsFeedPrizeLike;
const NewsFeedReply = require('../models').NewsFeedReply;

class NewsFeedService {

  // 뉴스피드 목록 조회
  static findAll() {
    return NewsFeed.findAll();
  }

  // 특정 뉴스피드 조회
  static findById() {

  }

  static findNewsFeedLike(newsFeedId, memberId) {
    return NewsFeedLike.findOne({
      newsFeedId: newsFeedId,
      memberId: memberId
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

  // 특정 뉴스피드 댓글 조회
  static findReplyByNewsFeedId() {

  }

  // 특정 뉴스피드 상 조회
  static findPrizeByNewsFeedId() {

  }

}

module.exports = NewsFeedService;
