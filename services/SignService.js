const RedisClient = require('../libs/RedisClient.js');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config.json').jwt;

class SignService {

  // 로그인
  in (memberData) {
    return this.jwtSign(memberData).then(this.setRedis);
  }

  // 로그아웃
  out(key) {
    return this.deleteRedis(key);
  }

  // 토큰 생성
  jwtSign(memberData) {
    return new Promise((resolve, reject) => {
      jwt.sign(memberData, jwtConfig.secret, (error, token) => {
        if (error)
          reject(error);
        else {
          resolve([memberData, token]);

        }
      });
    });
  }

  // 토큰 복호화
  jwtVerify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtConfig.secret, (error, decoded) => {
        if (error) {
          error.status = 401;
          reject(error);
        } else
          resolve(decoded);
      });
    });
  }

  // 레디스에 로그인 정보 저장
  setRedis(data) {
    // console.log(memberData, token);
    return new Promise((resolve, reject) => {
      RedisClient.set(data[0].id, data[1], 'EX', 60 * 60 * 24 * 30, (error, result) => {
        if (error)
          reject(error);
        else
          resolve(data[1]);
      });
    });
  }

  // 레디스에서 로그인 정보 조회
  getRedis(key) {
    return new Promise((resolve, reject) => {
      RedisClient.get(key, (error, result) => {
        if (error)
          reject(error);
        else
          resolve(result);
      });
    });
  }


  // 레디스에서 로그인 정보 삭제
  deleteRedis(key) {
    return new Promise((resolve, reject) => {
      RedisClient.del(key, (error) => {
        if (error)
          reject(error);
        else
          resolve();
      });
    });
  }
}

module.exports = SignService;
