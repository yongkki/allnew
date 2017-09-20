const NewsFeed = require('../models').NewsFeed;
const NewsFeedReply = require('../models').NewsFeedReply;

class NewsFeedReplyService {


  /*
  =======================================
  댓글 관련
  =======================================
  */


  // 특정 뉴스피드 특정 댓글 조회(사용자)
  findByMemberId(replyId, memberId) {
    return NewsFeedReply.findOne({
      where: {
        id: replyId,
        memberId: memberId

      }
    });
  }


  // 특정 뉴스피드 댓글 조회
  findById(newsFeedId) {
    return NewsFeedReply.findAll({
      where: {
        newsFeedId: newsFeedId
      }
    });
  }

  // 특정 뉴스피드 댓글 등록
  create(content, newsFeedId, memberId) {
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
  update(replyId, content) {
    return NewsFeedReply.update({
      content: content
    }, {
      where: {
        id: replyId
      }
    });
  }

  // 특정 뉴스피드 댓글 삭제
  delete(replyId, newsFeedId) {
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

}

module.exports = NewsFeedReplyService;
