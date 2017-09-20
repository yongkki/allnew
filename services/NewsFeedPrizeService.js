const NewsFeedPrize = require('../models').NewsFeedPrize;

class NewsFeedPrizeService {


  /*
  =======================================
  상 관련
  =======================================
  */

  // 특정 뉴스피드 상 목록 조회
  findByNewsFeedId(newsFeedId) {
    return NewsFeedPrize.findAll({
      where: {
        newsFeedId: newsFeedId
      }
    });
  }
  // 특정 뉴스피드 특정 상 조회
  findById(prizeId) {
    return NewsFeedPrize.findOne({
      where: {
        id: prizeId
      }
    });
  }

  // 특정 뉴스피드 상 등록
  create(prizeName, newsFeedId, memberId) {
    return NewsFeedPrize.create({
      name: prizeName,
      newsFeedId: newsFeedId,
      memberId: memberId
    });
  }


}

module.exports = NewsFeedPrizeService;
