const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
  name: String,
  price: Number,
  author: String,
  is_hot: Boolean
})

let bookModel = mongoose.model('books', bookSchema)

module.exports = bookModel