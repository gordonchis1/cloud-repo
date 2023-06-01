const testRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')

testRouter.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testRouter
