var express = require('express')
var router = express.Router()
const Foods = require('../models/food')

router.get('/api/get/foods', async (req, res, next) => {
  try {
    const dataFoods = await Foods.find({ })
    res.send(dataFoods)
  } catch (error) {
    next(error)
  }
})

router.get('/api/get/foods/:id', async (req, res, next) => {
  try {
    const dataFoods = await Foods.findOne({ _id: req.params.id })
    console.log(dataFoods)
    res.send(dataFoods)
  } catch (error) {
    next(error)
  }
})

router.post('/api/post/foods', async (req, res, next) => {
  try {
    const dataFoods = new Foods({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image
    })
    await dataFoods.save()
    res.send(dataFoods)
  } catch (error) {
    next(error)
  }
})

router.put('/api/put/foods/:id', async (req, res, next) => {
  const dataFood = await Foods.findOne({ _id: req.params.id })
  dataFood.name = req.body.name
  dataFood.price = req.body.price
  dataFood.image = req.body.image
  await dataFood.save()
  res.send(dataFood)
})

router.delete('/api/delete/foods/:id', async (req, res, next) => {
  const dataFood = await Foods.findOne({ _id: req.params.id })
  await dataFood.remove()
  res.send(dataFood)
})

module.exports = router
