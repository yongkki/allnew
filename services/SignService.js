const RedisClient = require('../libs/RedisClient.js');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config.json').jwt;

class SignService {

  // 로그인
  static in(memberData) {
    return this.jwtSign(memberData).then(this.setRedis);
  }

  // 로그아웃
  static out(token) {
    return this.jwtVerify(token).then(this.deleteRedis);
  }

  // 토큰 생성
  static jwtSign(memberData){
    return new Promise(function(resolve, reject){
      jwt.sign(memberData, jwtConfig.secret, function(error, token){
        if (error)
          reject(error);
        else{
          console.log(token);
          resolve([memberData, token]);

        }
      });
    });
  }

  // 토큰 복호화
  static jwtVerify(token){
    return new Promise(function(resolve, reject){
      jwt.verify(token, jwtConfig.secret, function(error, decoded){
        if (error){
          error.status = 401;
          reject(error);
        }
        else
          resolve(decoded);
      });
    });
  }

  // 레디스에 로그인 정보 저장
  static setRedis(data){
    // console.log(memberData, token);
    return new Promise(function(resolve, reject) {
      RedisClient.set(data[0].id, data[1], 'EX', 60 * 60 * 24 * 30, function(error, result){
        if (error)
          reject(error);
        else
          resolve(data[1]);
      });
    });
  }


  // 레디스에서 로그인 정보 삭제
  static deleteRedis(decoded){
    return new Promise(function(resolve, reject){
      RedisClient.del(decoded.id, function(error){
        if (error)
          reject(error);
        else
          resolve();
      });
    });
  }
}

module.exports = SignService;
