const notesRuter = require('express').Router()
const Note = require('../models/Note.js')
const User = require('../models/User.js')
const userStractor = require('../middlewares/userStractor')

notesRuter.get('/', async (request, response, next) => {
  const notes = await Note.find().populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRuter.get('/:id', userStractor, async (request, response, next) => {
  const { id } = request.params

  try {
    const note = await Note.findById(id)
    if (note) {
      return response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

notesRuter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const updateNote = {
    content: note.content,
    important: note.important
  }

  const putNote = await Note.findByIdAndUpdate(id, updateNote, { new: true })

  response.json(200, putNote).end()
})

notesRuter.delete('/:id', userStractor, async (request, response, next) => {
  const { id } = request.params
  try {
    const note = await Note.findByIdAndRemove(id)
    response.status(204, note).end()
  } catch (err) { next(err) }
})

notesRuter.post('/', userStractor, async (request, response, next) => {
  const { content, important = false } = request.body

  const { userId } = request
  const user = await User.findById(userId)

  if (!content) {
    return response.status(400).json({ error: 'no error mising is ivalid' })
  }

  const noteDb = new Note({
    content,
    important,
    date: new Date().toISOString(),
    user: user._id
  })
  try {
    const savedNote = await noteDb.save()

    user.notes = user.notes.concat(savedNote._id)

    await user.save()
    response.json(savedNote)
  } catch (err) {
    next(err)
  }
})

module.exports = notesRuter
