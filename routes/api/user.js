const express = require('express');
const UserModel = require('../../models/UserModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
  let { username, pwd } = req.body
  UserModel.findOne({ username: username, pwd: md5(pwd) })
    .then(data => {
      // 数据库中未找到账户信息
      if (!data) {
        return res.json({
          code: '2001',
          msg: 'login failed',
          data: null
        })
      }
      let token = jwt.sign({
        username: data.username,
        _id: data._id
      }, 'test', {
        expiresIn: 7 * 24 * 60 * 60
      })
      res.json({
        code: '0000',
        msg: 'success',
        data: { username: data.username, token }
      })
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router