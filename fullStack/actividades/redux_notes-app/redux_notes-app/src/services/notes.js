import axios from 'axios'


const baseUrl = 'http://localhost:3001/notas'

export const getAll = async() => {
    const  res = await axios.get(baseUrl)
    return res.data
}

export const createNewNote = async(content) => {
    const note = {content, important: false }
    
    const response = await axios.post(baseUrl, note)
    return response.data
}