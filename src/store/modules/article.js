import api from '@/api'

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailed: '[article] getArticleFailed'
}

export const actionTypes = {
  getArticle: '[article] getArticle'
}

export const getterTypes = {
  getArticle: '[article] getArticle'
}

export default {
  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    [mutationTypes.getArticleStart] (state) {
      state.data = null
      state.error = null
      state.isLoading = true
    },
    [mutationTypes.getArticleSuccess] (state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationTypes.getArticleFailed] (state, payload) {
      state.isLoading = false
      state.error = payload
    }
  },
  actions: {
    [actionTypes.getArticle] (context, {article}) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.getArticleStart)

        api.getArticle(article)
        .then((response) => {
          context.commit(mutationTypes.getArticleSuccess, response.data.article)
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailed, 'Not found')
        })
      })
    }
  },
  getters: {
    [getterTypes.getArticle]: state => state.data
  }
}
