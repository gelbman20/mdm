import axios from './axios';

// Users
const registerUser = (credential) => axios.post('/users', { user: credential })

const loginUser = (credential) => axios.post('/users/login', { user: credential })

const authorizationUser = () => axios.get('/user')

// Feed
const getFeed = apiUrl => axios.get(apiUrl)

// Tags
const getTags = () => axios.get('/tags')

// Article
const getArticle = (slug) => axios.get(`/articles/${slug}`)

const deleteArticle = (slug) => axios.delete(`/articles/${slug}`)

const createArticle = (article) => axios.post('/articles', { article })

export default {
  registerUser,
  loginUser,
  authorizationUser,
  getFeed,
  getTags,
  getArticle,
  deleteArticle,
  createArticle
}
