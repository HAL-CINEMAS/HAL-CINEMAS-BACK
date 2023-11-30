import axios from 'axios'

const http = axios.create({
  baseURL: 'http://127.0.0.1:3007/',
  timeout: 10000
})

export default http