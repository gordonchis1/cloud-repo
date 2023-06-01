import proptypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NewNote from './components/newNote'
import Notes from './components/Notes'
import { initNotes } from './reducers/noteReducers'


const App = () => {
  const  filterSelected = (value) => {
    console.log(value)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initNotes())
  }, [dispatch])

    return (
      <div>
        <NewNote />
        <div>
          all
          <input type="radio" name="filter" onChange={() => {filterSelected('ALL')}} />
          important
          <input type="radio" name="filter" onChange={() => {filterSelected('IMPORTANT')}} />          
          no important
          <input type="radio" name="filter" onChange={() => {filterSelected('NO_IMPORTANT')}} />
        </div>
        <Notes />
      </div>
    )
  }

export default App

App.propTypes = {
    store: proptypes.object.isRequired
}