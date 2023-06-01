import { useSelector, useDispatch } from "react-redux"
import { toggleImportantCreate } from "../reducers/noteReducers"

export default function Notes(){
    const state = useSelector(state => state.notas)
    const dispatch = useDispatch()

    const toggleImportant = (content) => {
        dispatch(toggleImportantCreate(content))
    }

    return(
        <ul>
        {state !== undefined ? 
        state.map((element) => {
          return (
          <li key={element.content} onClick={() => {toggleImportant(element.content)}}>
            {element.content}
            <strong>
                {String(element.important)}
            </strong>
          </li>
          )
        }) : ''}
        </ul>
    )
}