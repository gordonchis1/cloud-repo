import deepFreeze from "deep-freeze";
import { noteReducer } from "./noteReducers";

describe('noteReducers', () => {
test('returns new state after action with toggle importance', () => {
    const state = [{
        content: 'hola',
        important: false
    },
    {
    content: 'papa',
    important: false
}]

    const action = {
        type: 'NOTE_TOGGLE-IMPORTANCE',
        payload: {
            content: 'hola'
        }}
        deepFreeze(state)
        const newState = noteReducer(state, action)
        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(state[1])
        expect(newState).toContainEqual({
            content: 'hola',
            important: true
        })

}) 
})