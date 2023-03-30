const express = require('express');
const UserModel = require('../../models/UserModel');
// md5 加密
const md5 = require('md5');

const router = express.Router()

router.get('/reg', (req, res) => {
  res.render('auth/register')
})

router.post('/reg', (req, res) => {
  UserModel.create({ ...req.body, pwd: md5(req.body.pwd) })
    .then(data => {
      res.send('Register Success!!!')
    })
    .catch(err => {
      res.send('Register failed!!!')
    })
})

// login
router.get('/login', (req, res) => {
  res.render('auth/login')
})
router.post('/login', (req, res) => {
  const { username, pwd } = req.body
  UserModel.findOne({ username: username, pwd: md5(pwd) })
    .then(data => {
      if (!data) {
        return res.send('账号或密码错误')
      }
      req.session.username = data.username
      req.session._id = data._id
      res.render('account/success', { msg: 'Login success!!!', url: '/account' })
    })
    .catch(err => {
      res.send('账号或密码错误')
    })
})

// logout
router.post('/logout', (req, res) => {
  // res.render('account/success', { msg: '退出成功~~', url: '/login' })
  req.session.destroy(data => {
    res.render('account/success', { msg: '退出成功~~', url: '/login' })
    console.log(data)
  })
})

module.exports = router