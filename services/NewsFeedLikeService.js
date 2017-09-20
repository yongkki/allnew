const NewsFeed = require('../models').NewsFeed;
const NewsFeedLike = require('../models').NewsFeedLike;

class NewsFeedLikeService {


  /*
  =======================================
  좋아요 관련
  =======================================
  */

  // 특정 뉴스피드 좋아요 정보 조회(사용자)
  findByMemberId(newsFeedId, memberId) {
    return NewsFeedLike.findOne({
      where: {
        newsFeedId: newsFeedId,
        memberId: memberId
      }
    });
  }

  // 특정 뉴스피드 좋아요 하기
  create(newsFeedId, memberId) {
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
  delete(newsFeedId, memberId) {
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

}

module.exports = NewsFeedLikeService;
