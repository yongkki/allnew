const NewsFeed = require('../models').NewsFeed;
class NewsFeedService {

  /*
  =======================================
  뉴스피드 조회 관련
  =======================================
  */

  // 뉴스피드 목록 조회
  findAll() {
    return NewsFeed.findAll();
  }

  // 특정 뉴스피드 조회
  findById(newsFeedId) {
    return NewsFeed.findOne({
      where: {
        id: newsFeedId
      }
    });
  }

}

module.exports = NewsFeedService;
