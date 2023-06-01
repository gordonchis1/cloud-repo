import { createNewNote, getAll } from "../services/notes"


export const noteReducer = (state = [], action) => {
    switch(action.type){
      case 'INIT_NOTES':
        return action.payload
      case 'NEW_NOTE': 
        return state.concat(action.payload)
      case 'NOTE_TOGGLE_IMPORTANCE':
        {
        const {content} = action.payload

        return state.map((element) => {
            if(element.content === content){
                return {
                    ... element, 
                    important: !element.important
                }
            }
            return element
        })
        }
        default: return state
    }
  }

  export const toggleImportantCreate = content => {
   return{
      type:'NOTE_TOGGLE_IMPORTANCE',
      payload:{content}
     }
   }

   export const createNote = content => {

    return async (dispatch) => {
      const newNote = await createNewNote(content)

      dispatch({
        type: 'NEW_NOTE',
        payload: newNote
      })
    }
    }

 export const initNotes = () => {
  return async (dispatch) => {
    const notes = await getAll()

    dispatch({
      type: 'INIT_NOTES',
      payload: notes
    })
  }

 }
