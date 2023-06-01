import axios from 'axios'

const baseUrl = '/api/login'

export const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}
