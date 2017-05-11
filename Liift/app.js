const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/liift')

const app = express()

app.use(bodyParser.json())
routes(app)

module.exports = app
