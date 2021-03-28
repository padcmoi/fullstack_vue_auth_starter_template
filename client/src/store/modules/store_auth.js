export default {
  namespaced: true,
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    userId: -1,
  }),
  mutations: {
    isLoggedIn(state, payload) {
      state.isLogged = payload
    },
    isAdmin(state, payload) {
      state.isAdmin = payload
    },
    userId(state, payload) {
      state.userId = payload
    },
  },
  actions: {
    // async login({ commit }, form) {},
    // async logout({ commit }) {},
    // async register({ commit }, form) {},
  },
}
