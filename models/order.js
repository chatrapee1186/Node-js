const mongoose = require('mongoose')
const Schmema = mongoose.Schema

const Orders = new Schmema({
  producr: String,
  price: String,
  detail: String
})

module.exports = mongoose.model('Orders', Orders)
