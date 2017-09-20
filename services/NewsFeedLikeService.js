const NewsFeed = require('../models').NewsFeed;
const Models = require('../models');

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

    return Models.sequelize.transaction((transaction) => {
      return NewsFeedLike.create({
        newsFeedId: newsFeedId,
        memberId: memberId
      }, {
        transaction: transaction
      }).then(() => NewsFeed.increment('like_count', {
        by: 1,
        where: {
          id: newsFeedId
        },
        transaction: transaction
      }));
    });

  }

  // 특정 뉴스피드 좋아요 삭제
  delete(newsFeedId, memberId) {

    return Models.sequelize.transaction((transaction) => {
      return NewsFeedLike.destroy({
        where: {
          newsFeedId: newsFeedId,
          memberId: memberId
        },
        transaction: transaction
      }).then(() => NewsFeed.increment('like_count', {
        by: -1,
        where: {
          id: newsFeedId
        },
        transaction: transaction
      }));
    });

  }

}

module.exports = NewsFeedLikeService;
