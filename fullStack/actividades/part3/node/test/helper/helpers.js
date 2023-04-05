const { app } = require('../../index')
const supertest = require('supertest')

const api = supertest(app)

const initialNotes = [
  {
    content: 'Ya mero llegamos',
    data: new Date(),
    important: true
  },
  {
    content: 'solo un paso llegamos',
    data: new Date(),
    important: true
  }
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return response.body.map(element => element.content)
}

const getAllNotes = async () => {
  return api.get('/api/notes')
}

module.exports = {
  initialNotes,
  getAllContentFromNotes,
  getAllNotes,
  api
}
