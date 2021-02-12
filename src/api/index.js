import axios from './axios';

const registerUser = (credential) => axios.post('/users', { user: credential })

const loginUser = (credential) => axios.post('/users/login', { user: credential })

const authorizationUser = () => axios.get('/user')

export default {
  registerUser,
  loginUser,
  authorizationUser
}
