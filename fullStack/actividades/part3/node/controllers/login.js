const bycrypt = require('bcrypt')
const loginRuter = require('express').Router()
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

loginRuter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bycrypt.compare(password, user.passwordHash)

  if (!(passwordCorrect && user)) {
    response.status(401).json({
      error: 'error invalid user o password'
    })
  } else {
    const userForToken = {
      id: user.id,
      username: user.username
    }

    const token = jwt.sign(userForToken,
      process.env.JWT_SECRET_STRING,
      {
        expiresIn: 60 * 60 * 24 * 7
      })

    response.send({
      name: user.name,
      username: user.username,
      token
    })
  }
})

module.exports = loginRuter
