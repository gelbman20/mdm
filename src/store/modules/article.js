import api from '@/api'
import { transformErrors } from '@/helpers';

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailed: '[article] getArticleFailed',

  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailed: '[article] deleteArticleFailed',

  createArticleStart: '[article] createArticleStart',
  createArticleSuccess: '[article] createArticleSuccess',
  createArticleFailed: '[article] createArticleFailed'
}

export const actionTypes = {
  getArticle: '[article] getArticle',
  deleteArticle: '[article] deleteArticle',
  createArticle: '[article] createArticle'
}

export const getterTypes = {
  getArticle: '[article] getArticle',
  isLoading: '[article] isLoading',
  isReady: '[article] isReady',
  error: '[article] error',
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
    },
    [mutationTypes.deleteArticleStart] (state) {},
    [mutationTypes.deleteArticleSuccess] () {},
    [mutationTypes.deleteArticleFailed] () {},
    [mutationTypes.createArticleStart] (state) {
      state.isLoading = true
      state.error = null
    },
    [mutationTypes.createArticleFailed] (state, payload) {
      state.isLoading = false
      state.error = payload
    },
    [mutationTypes.createArticleSuccess] (state) {
      state.isLoading = false
    }
  },
  actions: {
    [actionTypes.getArticle] (context, {slug}) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.getArticleStart)

        api.getArticle(slug)
        .then((response) => {
          context.commit(mutationTypes.getArticleSuccess, response.data.article)
          resolve(response.data.article)
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailed, 'Not found')
        })
      })
    },

    [actionTypes.deleteArticle] (context, {slug}) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.deleteArticleStart)

        api.deleteArticle(slug)
        .then((response) => {
          context.commit(mutationTypes.deleteArticleSuccess)
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArticleFailed)
        })
      })
    },

    [actionTypes.createArticle] (context, payload) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.createArticleStart)

        api.createArticle(payload)
        .then((response) => {
          context.commit(mutationTypes.createArticleSuccess)
          resolve(response.data.article)
        })
        .catch((errors) => {
          context.commit(mutationTypes.createArticleFailed, transformErrors(errors.response.data.errors))
        })
      })
    }
  },
  getters: {
    [getterTypes.getArticle]: state => state.data,
    [getterTypes.isLoading]: state => state.isLoading,
    [getterTypes.isReady]: state => !state.isLoading && !state.error,
    [getterTypes.error]: state => state.error
  }
}
