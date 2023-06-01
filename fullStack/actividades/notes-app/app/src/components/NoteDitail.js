import { useParams } from 'react-router'

export const NoteDitail = ({ notes }) => {
  const { id } = useParams()

  const note = notes.find(note => note.id === id)
  if (!note) { return null }
  return (
    <div>
      <h2>{note?.content}</h2>
      <div>{note?.user?.name}</div>
      <div>
        <strong>
          {note.important ? 'important' : 'not important'}
        </strong>
      </div>
    </div>
  )
}
