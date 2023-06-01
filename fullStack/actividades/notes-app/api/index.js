require('./mongo')
require('dotenv').config()

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const express = require('express')
const app = express()
const cors = require('cors')
const userRuter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRuter = require('./controllers/login')

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

app.use('/api/users', userRuter)
app.use('/api/notes', notesRouter)
app.use('/api/login', loginRuter)
app.use(express.static('../app/build'))

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/testing')
  app.use('/api/testing', testRouter)
}

app.use(Sentry.Handlers.errorHandler())

app.use((error, requets, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'Bad Request' }).end()
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'token is invalid ' })
  } else {
    response.status(500).end()
  }
})

app.use((request, response) => {
  response.status(400).json({ error: 'NOT ' })
}
)

const { NODE_ENV, PORT } = process.env

const port = NODE_ENV === 'test' ? PORT : 3100

const server = app.listen(port, () => { console.log(`live server in port ${port}`) })

module.exports = { server, app }
