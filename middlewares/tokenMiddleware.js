module.exports = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  let token = req.get('authorization')

  jwt.verify(token, 'test', (err, data) => {
    if (err) {
      return res.json({
        code: '2002',
        msg: 'token 验证失败~~',
        data: null
      })
    }
    next()
  })
}