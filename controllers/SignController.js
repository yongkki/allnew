const express = require('express');
const MemberService = require('../services/MemberService.js');
const SocialService = require('../services/SocialService.js');
const SignService = require('../services/SignService.js');
const CustomError = require('../libs/CustomError.js');
const MiddleWare = require('./MiddleWare.js');
let middleWare = new MiddleWare();
const router = express.Router();

// 로그인
router.post('/in', (req, res, next) => {
  if (!req.body.accessToken || !req.body.fcmToken || (req.body.type != 'facebook'))
    return next(new CustomError("Bad Request", 400));
  let memberService = new MemberService(),
    socialService = new SocialService(),
    signService = new SignService();

  let socialData, memberData;
  socialService.findFacebookByAccessToken(req.body.accessToken)
    .then((body) => {
      socialData = body;
      return memberService.findOneBySocialIdAndSocialType(req.body.type, body.id);
    })
    .then((data) => {
      if (!data) {
        socialData.fcmToken = req.body.fcmToken;
        return memberService.create(socialData);
      } else {
        memberData = data;
        memberData.fcmToken = req.body.fcmToken;
        return memberService.update(memberData);
      }
    })
    .then((result) => signService.in(Array.isArray(result) ? memberData.dataValues : result.dataValues))
    .then((token) => res.send({
      token: token
    }))
    .catch(next);
});

router.use(middleWare.permissionCheck);

// 로그아웃
router.post('/out', (req, res, next) => {
  let signService = new SignService();
  signService.out(req.memberId)
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
