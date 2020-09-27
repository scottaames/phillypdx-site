import axios from 'axios'

const options = {
  url: `https://phillypdx-site.herokuapp.com/menu`,
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

export default {
  getMenu() {
    return axios(options)
  },
}
