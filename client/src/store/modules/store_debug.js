export default {
  namespaced: true,
  state: () => ({
    data: null,
  }),
  getters: {
    get(state) {
      return state.data
    },
  },
  mutations: {
    set(state, payload) {
      state.data = payload || null
    },
  },
  actions: {
    set({ commit }, data) {
      commit('set', data)
    },
  },
}
