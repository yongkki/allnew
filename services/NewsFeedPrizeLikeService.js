const NewsFeedPrize = require('../models').NewsFeedPrize;
const NewsFeedPrizeLike = require('../models').NewsFeedPrizeLike;

class NewsFeedPrizeLikeService {

  /*
  =======================================
  상 좋아요 관련
  =======================================
  */

  // 특정 뉴스피드 특정 상 좋아요 정보 조회(사용자)
  findByMemberId(prizeId, memberId) {
    return NewsFeedPrizeLike.findOne({
      where: {
        newsFeedPrizeId: prizeId,
        memberId: memberId
      }
    });
  }

  // 특정 뉴스피드 특정 상 좋아요 하기
  create(prizeId, memberId) {
    return Models.sequelize.transaction((transaction) => {
      return NewsFeedPrizeLike.create({
        newsFeedPrizeId: prizeId,
        memberId: memberId
      }, {
        transaction: transaction
      }).then(() => NewsFeedPrize.increment('like_count', {
        by: 1,
        where: {
          id: prizeId
        },
        transaction: transaction
      }));
    });

  }

  // 특정 뉴스피드 특정 상 좋아요 삭제
  delete(prizeId, memberId) {

    return Models.sequelize.transaction((transaction) => {
      return NewsFeedPrizeLike.destroy({
        where: {
          newsFeedPrizeId: prizeId,
          memberId: memberId
        },
        transaction: transaction
      }).then(() => NewsFeedPrize.increment('like_count', {
        by: -1,
        where: {
          id: prizeId
        },
        transaction: transaction
      }));
    });

  }

}

module.exports = NewsFeedPrizeLikeService;
