const userRuter = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

userRuter.post('/', async (request, response, next) => {
  try {
    const { body } = request
    const { username, name, password } = body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).json({ error })
  }
})

userRuter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 })
  response.json(users)
})

module.exports = userRuter
