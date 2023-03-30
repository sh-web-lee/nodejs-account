module.exports = function (success, error) {

  if (typeof error !== 'function') {
    error = () => {
      console.log('连接失败~~');
    }
  }

  const mongoose = require('mongoose');
  const { DBHOST, DBPORT, DBNAME } = require('../config/config')

  mongoose.connect(`mongodb://${ DBHOST }:${ DBPORT }/${ DBNAME }`)

  mongoose.connection.once('open', () => {
    success()
  })
  mongoose.connection.once('error', () => {
    console.log('connect error!');
    error()
  })
  mongoose.connection.once('close', () => {
    console.log('connect close!');
  })

}