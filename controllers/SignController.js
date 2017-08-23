const express = require('express');
const MemberService = require('../services/MemberService.js');
const SocialService = require('../services/SocialService.js');
const SignService = require('../services/SignService.js');
const CustomError = require('../libs/CustomError.js');
const router = express.Router();

// 로그인
router.post('/in', function(req, res, next) {
  if (!req.body.accessToken || !req.body.fcmToken || (req.body.type != 'facebook'))
    next(new CustomError("Bad Request", 400));
  let socialData;
  SocialService.findFacebookByAccessToken(req.body.accessToken)
    .then(function(body) {
      socialData = body;
      return MemberService.findOneBySocialIdAndSocialType(req.body.type, body.id);
    })
    .then(function(memberData) {
      if (!memberData){
        socialData.fcmToken = req.body.fcmToken;
          return MemberService.create(socialData);
      }
      else {
        memberData.fcmToken = req.body.fcmToken;
        return MemberService.update(memberData);
      }
    })
    .then(function(memberData) {
      memberData = memberData.dataValues || memberData;
      return SignService.in(memberData);
    })
    .then((token) => res.send({
      token: token
    }))
    .catch(function(error) {
      next(new CustomError(error.message || error, error.status || 500));
    });
});

router.post('/out', function(req, res, next) {
  if (!req.headers.authorization) next(new CustomError("Bad Request", 400));
  SignService.out(req.headers.authorization)
    .then(() => res.sendStatus(204))
    .catch(function(error) {
      next(new CustomError(error.message || error, error.status || 500));
    });
});

module.exports = router;
