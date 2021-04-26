import Vue from 'vue'
import Vuex from 'vuex'

import store_auth from './modules/store_auth'
import store_csrf from './modules/store_csrf'
import store_debug from './modules/store_debug'
import store_check_form from './modules/store_check_form'
import store_accessibility from './modules/store_accessibility'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    store_auth,
    store_csrf,
    store_debug,
    store_check_form,
    store_accessibility,
  },
})

store.dispatch('store_accessibility/init')
store.dispatch('store_auth/loop_check_auth')

export default store
