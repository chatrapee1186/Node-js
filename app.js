var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

var foodsRouter = require('./routes/food')
var signup = require('./routes/signup')

var cors = require('cors')
// var home = require('./routes/home')

var app = express()

var { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  user: `${DB_USER}`,
  useNewUrlParser: true,
  pass: `${DB_PASS}`,
  authMechanism: 'SCRAM-SHA-1',
  useCreateIndex: true
}).then(rs => {
  console.log('connect success')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', foodsRouter)
app.use('/', signup)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
