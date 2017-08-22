const express = require('express');
const MemberService = require('../services/MemberService.js');
const CustomError = require('../libs/CustomError.js');
const router = express.Router();

// 로그인
router.post('/', function(req, res, next) {
});

module.exports = router;
