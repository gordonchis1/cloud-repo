import { useDispatch, useSelector } from "react-redux"
import { createNote } from "../reducers/noteReducers"


export default function NewNote(){

    const dispatch = useDispatch()
    console.log(useSelector(state => state))

    const addNote = async(event) => {
        event.preventDefault()
        const content = event.target[0].value
        dispatch(createNote(content))
        event.target[0].value = ''  
    }


    return (
        <form onSubmit={addNote}>
        <input type="text" name='note'/>
        <button>add</button>
      </form>
    )
}