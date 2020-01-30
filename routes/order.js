var express = require('express')
var router = express.Router()
const Orders = require('../models/order')

router.get('/api/get/order', async (req, res, next) => {
  try {
    const dataOrders = await Orders.find({ })
    res.send(dataOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/api/get/order/:id', async (req, res, next) => {
  try {
    const dataOrders = await Orders.findOne({ _id: req.params.id })
    console.log(dataOrders)
    res.send(dataOrders)
  } catch (error) {
    next(error)
  }
})

router.post('/api/post/foorderods', async (req, res, next) => {
  try {
    const dataOrders = new Orders({
      product: req.body.product,
      price: req.body.price,
      detail: req.body.detail
    })
    await dataOrders.save()
    res.send(dataOrders)
  } catch (error) {
    next(error)
  }
})

router.put('/api/put/foods/:id', async (req, res, next) => {
  const dataOrders = await Orders.findOne({ _id: req.params.id })
  dataOrders.product = req.body.product
  dataOrders.price = req.body.price
  dataOrders.detail = req.body.detail
  await dataOrders.save()
  res.send(dataOrders)
})

router.delete('/api/delete/foods/:id', async (req, res, next) => {
  const dataOrders = await Orders.findOne({ _id: req.params.id })
  await dataOrders.remove()
  res.send(dataOrders)
})

module.exports = router
