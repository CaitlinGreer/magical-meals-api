require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const mealsRouter = require('./meals/meals-router')
const errorHandler = require('./error-handler')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/meals', mealsRouter)

app.get('/', (req, res) => {
    res.send('Hello, world! Magical Meals')
})

//Error handler middleware (hide error messages from users)
app.use(errorHandler)

module.exports = app