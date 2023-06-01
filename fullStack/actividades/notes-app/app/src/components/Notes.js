import React, { useState } from 'react'
import Note from './Note'
import Notification from './Notification'
import noteService from '../services/notes.js'
import { login } from '../services/login'
import LoginFrom from './LoginFrom.js'
import NoteForm from './NoteForm'
import { useNavigate } from 'react-router-dom'
import useUser from '../Hooks/useUser'
import useNotes from '../Hooks/useNotes'
import Table from '@material-ui/core/Table'
import { TableContainer, TableBody, TableRow } from '@material-ui/core'

const Notes = () => {
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line no-unused-vars
  const { notes, toggleImportanceOf, addNote } = useNotes()

  const { users } = useUser()

  const navigate = useNavigate()

  const lcocalToggleImportance = (id) => {
    toggleImportanceOf(id).catch(() => {
      setErrorMessage(
        'Note  was already removed from server'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await login({ username, password })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)

      setPassword('')
      setUsername('')
      navigate('/')
    } catch (e) { setErrorMessage('Wrong Credencials') }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {users
        ? <NoteForm addNote={addNote} handleLogOut={handleLogOut} />
        : <LoginFrom
            handleSubmit={handleSubmit}
            password={password}
            username={username}
            handleUsernameChange={event => { setUsername(event.target.value) }}
            handlePasswordChange={event => { setPassword(event.target.value) }}
          />}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <TableContainer>
        <Table>
          <TableBody>
            {notesToShow.map((note, i) =>
              <TableRow key={i}>
                <Note
                  note={note}
                  toggleImportance={() => lcocalToggleImportance(note.id)}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Notes
