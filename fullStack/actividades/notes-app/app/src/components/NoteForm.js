import React, { useRef, useState } from 'react'
import Togglable from './Togglable'
import proptypes from 'prop-types'

const NoteForm = ({ addNote, handleLogOut }) => {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: false
    }

    addNote(noteObject)
    setNewNote('')
    togglableRef.current.changeVisibiliti()
  }

  return (
    <Togglable btnText='add note' ref={togglableRef}>
      <button onClick={handleLogOut}>cerrar secion</button>
      <form onSubmit={handleSubmit}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder='add note'
        />
        <button type='submit'>save</button>
      </form>
    </Togglable>
  )
}

NoteForm.proptypes = {
  addNote: proptypes.func.isRequired,
  handleLogOut: proptypes.func.isRequired
}

export default NoteForm
