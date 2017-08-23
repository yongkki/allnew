let redis = require('redis');
let redisConfig = require('../config.json').redis;
let redisClient = redis.createClient(redisConfig.port, redisConfig.host);
redisClient.auth(redisConfig.password);

module.exports = redisClient;
