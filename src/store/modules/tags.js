import api from '@/api'

export const mutationTypes = {
  getTagsStart: '[tags] getTagsStart',
  getTagsSuccess: '[tags] getTagsSuccess',
  getTagsFailed: '[tags] getTagsFailed'
}

export const actionTypes = {
  getTags: '[tags] getTags'
}

export const getterTypes = {
  isLoading: '[tags] isLoading',
  isError: '[tags] isError',
  tags: '[tags] tags'
}

export default {
  state: {
    data: null,
    isLoading: false,
    errors: null
  },

  mutations: {
    [mutationTypes.getTagsStart] (state) {
      state.data = null
      state.isLoading = true
    },

    [mutationTypes.getTagsSuccess] (state, { tags }) {
      state.data = tags
      state.isLoading = false
    },

    [mutationTypes.getTagsFailed] (state) {
      state.isLoading = false
    }
  },

  actions: {
    [actionTypes.getTags] (context) {
      context.commit(mutationTypes.getTagsStart)

      return new Promise((resolve) => {
        api.getTags()
        .then((response) => {
          context.commit(mutationTypes.getTagsSuccess, { tags: response.data.tags })
          resolve(response.data.tags)
        })
        .catch(() => {
          context.commit(mutationTypes.getTagsFailed)
        })
      })
    }
  },

  getters: {
    [getterTypes.isLoading]: state => state.isLoading,
    [getterTypes.tags]: state => state.data,
    [getterTypes.isError]: state => state.errors,
  }
}
