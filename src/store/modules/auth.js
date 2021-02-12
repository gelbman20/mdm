import api from '@/api'
import { setLocalStorageItem } from '@/helpers';

export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailed: '[auth] registerFailed',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailed: '[auth] loginFailed',

  authorizationStart: '[auth] authorizationStart',
  authorizationSuccess: '[auth] authorizationSuccess',
  authorizationFailed: '[auth] authorizationFailed'
}

export const actionTypes = {
  registerUser: '[auth] registerUser',
  loginUser: '[auth] loginUser',
  authorizationUser: '[auth] authorizationUser'
}

export const getterTypes = {
  isSubmit: '[auth] isSubmit',
  currentUser: '[auth] currentUser',
  validationsErrors: '[auth] validationsErrors',
  isLogin: '[auth] isLogin',
  isAnonymous: '[auth] isAnonymous'
}

export default {
  state: {
    isSubmit: false,
    currentUser: null,
    validationsErrors: {},
    isLogin: null,
  },

  mutations: {
    [mutationsTypes.registerStart] (state) {
      state.isSubmit = true
      state.validationsErrors = {}
    },
    [mutationsTypes.registerSuccess] (state, payload) {
      state.isSubmit = false
      state.currentUser = payload
      state.isLogin = true
    },
    [mutationsTypes.registerFailed] (state, payload) {
      state.isSubmit = false
      state.isLogin = false
      state.validationsErrors = payload
    },

    [mutationsTypes.loginStart] (state) {
      state.isSubmit = true
      state.validationsErrors = {}
    },
    [mutationsTypes.loginSuccess] (state, payload) {
      state.isSubmit = false
      state.currentUser = payload
      state.isLogin = true
    },
    [mutationsTypes.loginFailed] (state, payload) {
      state.isSubmit = false
      state.isLogin = false
      state.validationsErrors = payload
    },

    [mutationsTypes.authorizationStart] (state) {
      state.isSubmit = true
      state.validationsErrors = {}
    },
    [mutationsTypes.authorizationSuccess] (state, payload) {
      state.isSubmit = false
      state.currentUser = payload
      state.isLogin = true
    },
    [mutationsTypes.authorizationFailed] (state) {
      state.isSubmit = false
      state.isLogin = false
    },
  },

  actions: {
    [actionTypes.registerUser] (context, payload) {
      context.commit(mutationsTypes.registerStart);
      console.log('Register Start')

      return new Promise((resolve) => {
        api.registerUser(payload)
        .then((response) => {
          context.commit(mutationsTypes.registerSuccess, response.data.user)
          setLocalStorageItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((error) => {
          context.commit(mutationsTypes.registerFailed, error.response.data.errors)
        })
      })
    },

    [actionTypes.loginUser] (context, payload) {
      context.commit(mutationsTypes.loginStart)
      console.log('Login Start')

      return new Promise((resolve) => {
        console.log('Login Promise')
        api.loginUser(payload)
        .then((response) => {
          context.commit(mutationsTypes.loginSuccess, response.data.user)
          setLocalStorageItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((error) => {
          context.commit(mutationsTypes.loginFailed, error.response.data.errors)
        })
      })
    },

    [actionTypes.authorizationUser] (context, payload) {
      context.commit(mutationsTypes.authorizationStart)

      return new Promise(() => {
        api.authorizationUser()
        .then((response) => {
          context.commit(mutationsTypes.authorizationSuccess, response.data.user)
        })
        .catch((error) => {
          context.commit(mutationsTypes.authorizationFailed)
        })
      })
    }
  },

  getters: {
    [getterTypes.isSubmit]: state => state.isSubmit,
    [getterTypes.validationsErrors]: state => state.validationsErrors,
    [getterTypes.currentUser]: state => state.currentUser,
    [getterTypes.isLogin]: state => Boolean(state.isLogin),
    [getterTypes.isAnonymous]: state => state.isLogin === false
  }
}
