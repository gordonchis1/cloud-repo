import { composeWithDevTools } from 'redux-devtools-extension'
import {  noteReducer } from './reducers/noteReducers'
import { filterReducers } from './reducers/filterReducers'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  notas: noteReducer,
  filter: filterReducers
  }
)


export const store = createStore(
    reducers, 
    composeWithDevTools(applyMiddleware(thunk))
)