var express = require('express');
var router = express.Router();
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
// 导入登录状态中间件
const LoginMiddleware = require('../../middlewares/loginMiddleware')

// 首页重定向
router.get('/', LoginMiddleware, (req, res) => {
  res.redirect('/account')
})
// 记账本列表
router.get('/account', LoginMiddleware, function(req, res, next) {
  // let accounts = db.get('accounts').value()
  AccountModel.find().then(data => {
    // res.json(data)
    res.render('account/list', { accounts: data, moment })
  })
});

// 添加记录
router.get('/account/create', LoginMiddleware, function(req, res, next) {
  res.render('account/create')
});

// 
router.post('/account', LoginMiddleware, function(req, res, next) {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then(data => {
    res.render('account/success', { msg: '添加成功哦~~', url: '/account' })
  })
});

router.get('/account/:id', LoginMiddleware, (req, res) => {
  let id = req.params.id
  AccountModel.deleteOne({ _id: id }).then(data => {
    res.render('account/success', { msg: '添删除成功~~', url: '/account' })
  })
})
module.exports = router;
