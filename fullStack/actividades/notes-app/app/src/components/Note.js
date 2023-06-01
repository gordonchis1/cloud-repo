import React from 'react'
import { Link } from 'react-router-dom'
import TableCell from '@material-ui/core/TableCell'
import { Button } from './Button.js'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <>
      <TableCell className='note'>
        <Link to={`/Note/${note.id}`}>
          {note.content}
        </Link>
      </TableCell>
      <TableCell>
        <Button onClick={toggleImportance}>{label}</Button>
      </TableCell>
    </>
  )
}

export default Note
