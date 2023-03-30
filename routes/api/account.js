var express = require('express');
var router = express.Router();
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
const tokenMiddleware = require('../../middlewares/tokenMiddleware')

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})
// 记账本列表
router.get('/account', tokenMiddleware, (req, res) => {
    AccountModel.find()
    .then(data => {
      res.json({
        code: '0000',
        mgs: 'success',
        data
      })
    })
    .catch(err => {
      res.json({
        code: '1001',
        msg: 'error',
        data: null
      })
    })
});

// 添加记录
router.post('/account', tokenMiddleware, (req, res) => {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  })
  .then(data => {
    // res.render('success', { msg: '添加成功哦~~', url: '/account' })
    res.json({
      code: '0000',
      msg: 'success',
      data
    })
  })
  .catch(err => {
    res.json({
      code: '1002',
      msg: 'error',
      data: err
    })
  })
});

// 删除
router.delete('/account/:id', tokenMiddleware, (req, res) => {
  let id = req.params.id
  AccountModel.deleteOne({ _id: id }).then(data => {
    res.json({
      code: '0000',
      msg: 'success',
      data
    })
  })
  .catch(err => {
    res.json({
      code: '1003',
      msg: 'error',
      data: err
    })
  })
})

// 更新
router.patch('/account/:id', tokenMiddleware, (req, res) => {
  const id = req.params.id
  AccountModel.updateOne({ _id: id }, req.body).then(() => {
    // 更新成功，重新查询更新后数据，接口返回
    AccountModel.findById(id).then(data => {
      res.json({
        code: '0000',
        msg: 'success',
        data
      })
    })
    .catch(err => {
      res.json({
        code: '1005',
        msg: 'error',
        data: err
      })
    })
  })
  .catch(err => {
    res.json({
      code: '1004',
      msg: 'error',
      data: err
    })
  })
})

// 根据id获取单个账单
router.get('/account/:id', tokenMiddleware, (req, res) => {
  const id = req.params.id
  AccountModel.find({ _id: id }).then(data => {
    res.json({
      code: '0000',
      msg: 'success',
      data
    })
  })
  .catch(err => {
    res.json({
      code: '1005',
      msg: 'error',
      data: err
    })
  })
})

// 更新
module.exports = router;
