import Vue from 'vue'
import Vuex from 'vuex'

import store_auth from './modules/store_auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    store_auth,
  },
})

store.dispatch('store_auth/loop_check_auth')

export default store
