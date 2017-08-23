const SignService = require('../services/SignService.js');
const CustomError = require('../libs/CustomError.js');

class MiddleWare {
  static permissionCheck(req, res, next){
    if (!req.headers.authorization) next(new CustomError('Unauthorized', 401));
    SignService.jwtVerify(req.headers.authorization)
    .then(function(memberData){
      req.memberId = memberData.id;
      return SignService.getRedis(req.memberId);
    })
    .then(function(result){
      if (result != req.headers.authorization) next(new CustomError('Unauthorized', 401));
      next();
    })
    .catch((error) => next(new CustomError(error.message || error, error.status || 500)));
  }
}

module.exports = MiddleWare;
