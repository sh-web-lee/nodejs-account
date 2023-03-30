const mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
  id: String,
  title: String,
  time: String,
  type: Number,
  account: Number,
  remarks: String
})

let AccountModel = mongoose.model('accounts', AccountSchema)

module.exports = AccountModel