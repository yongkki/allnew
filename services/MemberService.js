const Member = require('../models').Member;

class MemberService {

  // 회원정보 조회
  static findOneBySocialIdAndSocialType(socialType, socialId) {
    return Member.findOne({
      where: {
        socialType: socialType,
        socialId: socialId
      }
    });
  }

  // 회원가입
  static create(socialData) {
    return Member.create({
      nickname: socialData.name,
      profile: socialData.profile,
      socialType: socialData.type,
      socialId: socialData.id,
      fcmToken: socialData.fcmToken
    });
  }

  static update(memberData) {
    return Member.update({
      fcmToken: memberData.fcmToken
    }, {
      where: {
        id: memberData.id
      }
    });
  }

}

module.exports = MemberService;
