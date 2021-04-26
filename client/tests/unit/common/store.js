import store_accessibility from '@/store/modules/store_accessibility'
import store_debug from '@/store/modules/store_debug'

const store_auth = {
  state: {
    // isInitAuth: true, // Mecanisme concu pour que le router attend les données de l'Api avant routage
    isLogged: false,
    isAdmin: false,
    userId: -1,
    username: null,
    firstname: '', // not available, maybe later implementation
    lastname: '', // not available, maybe later implementation
  },
  mutations: {
    isLogged(state, payload) {
      state.isLogged = payload || false
    },
    isAdmin(state, payload) {
      state.isAdmin = payload || false
    },
    username(state, payload) {
      state.username = payload || 'anonymous'
    },
    firstname(state, payload) {
      state.firstname = payload || ''
    },
    lastname(state, payload) {
      state.lastname = payload || ''
    },
  },
}

const store_check_form = {
  state: {
    usernameAvailable: false,
    overlayState: false,
    passwordRequire: {
      length: 3,
      upper: 1,
      lower: 1,
      number: 1,
    },
  },
  mutations: {
    usernameAvailable(state, payload) {
      state.usernameAvailable = payload || false
    },
    passwordRequirement(state, payload) {
      state.passwordRequire = payload
    },
    overlayState(state, payload) {
      state.overlayState = payload || false
    },
  },
}

const store_csrf = {
  state: { old_token: null, token: '' },
  mutations: {
    updateNewToken(state, payload) {
      state.token = payload || ''
    },
    updateOldToken(state, payload) {
      state.old_token = payload || null
    },
  },
}

export {
  store_accessibility,
  store_auth,
  store_check_form,
  store_csrf,
  store_debug,
}
