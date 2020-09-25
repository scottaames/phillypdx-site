import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:4242`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getMenu() {
    return apiClient.get('/menu')
  },
}
