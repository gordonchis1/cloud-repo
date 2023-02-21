const express = require('express')
const app = express()

app.use(express.json())

app.use((request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('=========')
  next()
})

let notes = [
  {
    id: 1,
    content:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    date: '22/02/23',
    important: true
  },
  {
    id: 2,
    content: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    date: '22/02/23',
    important: false
  },
  {
    id: 3,
    content: 'dolorem eum magni eos aperiam quia holas',
    date: '22/02/23',
    important: true
  }
]

app.get('/api/notes', (requets, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (requets, response) => {
  const id = Number(requets.params.id)

  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).json({ error: 'no nota 404' }).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)

  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({ error: 'no error mising is ivalid' })
  }

  const ids = notes.map((note) => note.id)
  const maxIds = Math.max(...ids)

  const newNote = {
    id: maxIds + 1,
    content: note.content,
    imporant: typeof note.imporant !== 'undefined' ? note.imporant : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({ error: 'NOT ' })
}
)

const port = 3000
app.listen(port, () => [console.log(`live server in port ${port}`)])
