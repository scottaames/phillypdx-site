import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getMenu() {
    return apiClient.get('/menu')
  },
  getMenuItem(id) {
    return apiClient.get('/menu/' + id)
  },
}
