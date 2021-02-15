import api from '@/api'

export const mutationsTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailed: '[feed] getFeedFailed'
}

export const actionTypes = {
  getFeed: '[feed] getFeed'
}

export default {
  state: {
    data: null,
    isLoading: false,
    errors: null
  },

  mutations: {
    [mutationsTypes.getFeedStart] (state) {
      state.isLoading = true
      state.data = null
    },
    [mutationsTypes.getFeedSuccess] (state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationsTypes.getFeedFailed] (state) {
      state.isLoading = false
    }
  },

  actions: {
    [actionTypes.getFeed] (context, { apiUrl }) {
      return new Promise((resolve) => {
        context.commit(mutationsTypes.getFeedStart)

        api.getFeed(apiUrl)
        .then((response) => {
          context.commit(mutationsTypes.getFeedSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationsTypes.getFeedFailed)
        })
      })
    }
  }
}
