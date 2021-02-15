import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import feed from './modules/feed'
import tags from './modules/tags'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    feed,
    tags
  }
})
