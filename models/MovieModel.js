const mongoose = require('mongoose');

let movieSchema = new mongoose.Schema({
  title: String,
  director: String
})

let movieModel = mongoose.model('movies', movieSchema)

module.exports = movieModel