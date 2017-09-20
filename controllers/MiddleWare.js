const SignService = require('../services/SignService.js');
const CustomError = require('../libs/CustomError.js');

class MiddleWare {
  permissionCheck(req, res, next) {
    let signService = new SignService();
    if (!req.headers.authorization)
      return next(new CustomError('Unauthorized', 401));
    signService.jwtVerify(req.headers.authorization)
      .then((memberData) => {
        req.memberId = memberData.id;
        return signService.getRedis(req.memberId);
      })
      .then((result) => {
        if (result != req.headers.authorization) throw new CustomError('Unauthorized', 401);
        next();
      })
      .catch(next);
  }
}

module.exports = MiddleWare;
