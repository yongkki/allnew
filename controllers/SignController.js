const express = require('express');
const MemberService = require('../services/MemberService.js');
const SocialService = require('../services/SocialService.js');
const SignService = require('../services/SignService.js');
const CustomError = require('../libs/CustomError.js');
const MiddleWare = require('./MiddleWare.js');
const router = express.Router();

// 로그인
router.post('/in', function(req, res, next) {
  if (!req.body.accessToken || !req.body.fcmToken || (req.body.type != 'facebook'))
    next(new CustomError("Bad Request", 400));
  let socialData, memberData;
  SocialService.findFacebookByAccessToken(req.body.accessToken)
    .then(function(body) {
      socialData = body;
      return MemberService.findOneBySocialIdAndSocialType(req.body.type, body.id);
    })
    .then(function(data) {
      if (!data) {
        socialData.fcmToken = req.body.fcmToken;
        return MemberService.create(socialData);
      } else {
        memberData = data;
        memberData.fcmToken = req.body.fcmToken;
        return MemberService.update(memberData);
      }
    })
    .then((result) => SignService.in(Array.isArray(result) ? memberData.dataValues : result.dataValues))
    .then((token) => res.send({token: token}))
    .catch(function(error) {
      next(new CustomError(error.message || error, error.status || 500));
    });
});

router.use(MiddleWare.permissionCheck);

// 로그아웃
router.post('/out', function(req, res, next) {
  SignService.out(req.memberId)
    .then(() => res.sendStatus(204))
    .catch(function(error) {
      next(new CustomError(error.message || error, error.status || 500));
    });
});

module.exports = router;
