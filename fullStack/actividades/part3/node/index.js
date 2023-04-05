require('./mongo')
require('dotenv').config()

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const Note = require('./models/Note')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

Sentry.init({
  dsn: 'https://e02719f6211a4011b43cfa12c274caa9@o4504817975164928.ingest.sentry.io/4504817976868869',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())

app.use(Sentry.Handlers.tracingHandler())

app.use((request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('=========')
  next()
})

app.get('/api/notes', async (requets, response) => {
  const notes = await Note.find()
  response.json(notes)
})

app.get('/api/notes/:id', (requets, response, next) => {
  const { id } = requets.params

  Note.findById(id).then(note => {
    if (note) {
      return response.json(note)
    } else {
      response.status(404).end()
    }
  }
  ).catch(err => {
    next(err)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const updateNote = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, updateNote, { new: true }).then(data => {
    response.json(200, data).end()
  }
  )
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id)
    .then(result => { response.status(204).end() }
    ).catch(err => next(err))
})

app.post('/api/notes', async (request, response, next) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({ error: 'no error mising is ivalid' })
  }

  const noteDb = new Note({
    content: note.content,
    important: typeof note.imporant !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  })
  try {
    const savedNote = await noteDb.save()
    response.json(savedNote)
  } catch (err) {
    next(err)
  }
})

app.use(Sentry.Handlers.errorHandler())

app.use((error, requets, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'Bad Request' }).end()
  } else {
    response.status(500).end()
  }
})

app.use((request, response) => {
  response.status(404).json({ error: 'NOT ' })
}
)
const port = 3005

const server = app.listen(port, () => { console.log(`live server in port ${port}`) })

module.exports = { server, app }
