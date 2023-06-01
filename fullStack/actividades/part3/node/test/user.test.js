const User = require('../models/User')
const bcrypt = require('bcrypt')
const { api, getAllUsers } = require('./helper/helpers')
const { server } = require('../index')
const mongoose = require('mongoose')

describe.only('crating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('1234', 10)
    const user = new User({ username: 'gordonchisBot', passwordHash, name: 'eduardo' })

    await user.save()
  })

  test('works as expected creating a fresh username', async () => {
    const usersAtStart = await getAllUsers()

    const newUser = {
      username: 'gordonchis',
      name: 'Eduardo',
      password: '1234'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getAllUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)

    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and mensage if username is alredy taken', async () => {
    const usersAtStart = await getAllUsers()

    const newUser = {
      username: 'gordonchisBot',
      name: 'Eduardo',
      password: '123'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error.errors.username.message).toContain('`username` to be unique')

    const userAtEnd = await getAllUsers()
    expect(userAtEnd).toHaveLength(usersAtStart.length)
  })

  test('the username has a length of 4 or more', async () => {
    const usersAtStart = await getAllUsers()

    const newUser = {
      username: 'go',
      name: 'Eduardo',
      password: '123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const userAtEnd = await getAllUsers()

    expect(userAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll(() => {
    server.close()
    mongoose.connection.close()
  })
})
