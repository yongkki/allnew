const request = require('request');

class SocialService {

  // 페이스북 정보 조회
  findFacebookByAccessToken(accessToken) {
    let url = 'https://graph.facebook.com/me?fields=id,name,picture&format=json&access_token=' + accessToken;
    return new Promise(function(resolve, reject) {
      request.get(url, function(err, res, body) {
        body = JSON.parse(body);
        if (body.error) {
          let error = {};
          error.message = body.error;
          error.status = 400;
          reject(error);
        } else {
          body.type = 'facebook';
          body.profile = body.picture.data.url;
          resolve(body);
        }
      });
    });
  }
}

module.exports = SocialService;
