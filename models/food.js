const mongoose = require('mongoose')
const Schmema = mongoose.Schema

const Foods = new Schmema({
  name: String,
  price: String,
  image: String
})

module.exports = mongoose.model('Foods', Foods)
