import axios from './axios';

// Users
const registerUser = (credential) => axios.post('/users', { user: credential })

const loginUser = (credential) => axios.post('/users/login', { user: credential })

const authorizationUser = () => axios.get('/user')

// Feed
const getFeed = apiUrl => axios.get(apiUrl)

// Tags
const getTags = () => axios.get('/tags')

export default {
  registerUser,
  loginUser,
  authorizationUser,
  getFeed,
  getTags
}
