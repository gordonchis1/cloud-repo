const mongoose = require('mongoose')
const Nota = require('../models/Note')
const { initialNotes, api, getAllContentFromNotes, getAllNotes } = require('./helper/helpers')
const { server } = require('../index')

beforeEach(async () => {
  await Nota.deleteMany()

  /*   const notesObjects = initialNotes.map(element => new Nota(element))
  const promises = notesObjects.map(element => element.save())
  await Promise.all(promises) */

  for (const element of initialNotes) {
    const notesObjects = new Nota(element)
    await notesObjects.save()
  }
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('There are two notes', async () => {
  const response = await getAllNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})

test('the first note is abaut gordonchis', async () => {
  const response = await getAllNotes()
  expect(response.body[0].content).toBe('Ya mero llegamos')
})

test('any not content is abaut gordonchis', async () => {
  const content = await getAllContentFromNotes()

  expect(content).toContain('Ya mero llegamos')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'proximamente cima',
    important: true
  }
  await api.post('/api/notes')
    .send(newNote)
    .expect(200)

  const response = await getAllNotes()
  const content = await getAllContentFromNotes()

  expect(response.body).toHaveLength(initialNotes.length + 1)

  expect(content).toContain('proximamente cima')
})

test('note without content is not aded', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await getAllNotes()

  expect(response.body).toHaveLength(initialNotes.length)
})

test('delete note that does not exist', async () => {
  await api.delete('/api/notes/1111111').expect(400)

  const resposne = await getAllNotes()

  expect(resposne.body).toHaveLength(initialNotes.length)
})

test('a note can be delete', async () => {
  const resposne = await getAllNotes()
  const { body } = resposne
  const noteToDelete = body[0]

  await api.del(`/api/notes/${noteToDelete.id}`).expect(204)

  const resposneAfter = await getAllNotes()

  expect(resposneAfter.body).toHaveLength(initialNotes.length - 1)
})

test('check that the notes change with put', async () => {
  const resposne = await getAllNotes()
  const { body } = resposne
  const noteToPut = body[0]

  await api.put(`/api/notes/${noteToPut.id}`).send({
    content: 'Ya es tarde',
    data: new Date(),
    important: true
  }).expect(200)

  const response = await getAllContentFromNotes()

  expect(response).toContain('Ya es tarde')
})
