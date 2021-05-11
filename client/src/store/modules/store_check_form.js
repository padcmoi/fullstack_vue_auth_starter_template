import api from '../../services/api'

export default {
  namespaced: true,
  state: () => ({
    usernameAvailable: false,
    courrielAvailable: false,
    overlayState: false,
    passwordRequire: {
      length: 3,
      upper: 1,
      lower: 1,
      number: 1,
    },
  }),
  mutations: {
    usernameAvailable(state, payload) {
      state.usernameAvailable = payload || false
    },
    courrielAvailable(state, payload) {
      state.courrielAvailable = payload || false
    },
    passwordRequirement(state, payload) {
      state.passwordRequire = payload
    },
    overlayState(state, payload) {
      state.overlayState = payload || false
    },
  },
  actions: {
    /**
     * Vérifie si un compte est libre
     *
     * @param {String} username
     */
    async usernameAvailable({ commit }, username) {
      const args = {
        user: username,
      }
      // const response = await api.get('account/status/user', args) // Param en argument
      const response = await api.get('account/status/user/' + username) // Param en route nommée
      commit('usernameAvailable', response.data && response.data['isAvailable'])
    },

    /**
     * Vérifie si une adresse de courriel est disponible
     *
     * @param {String} mail
     */
    async courrielAvailable({ commit }, mail) {
      const response = await api.get('account/status/mail/' + mail) // Param en route nommée
      commit('courrielAvailable', response.data && response.data['isAvailable'])
    },

    /**
     * récupère de l'Api les exigences concernant la complexité des mots de passe
     */
    async passwordRequirement({ commit }) {
      const response = await api.get('account/password/requirement/')

      if (response.data && response.data['password_check_requirement']) {
        const value = response.data['password_check_requirement']

        // On vérifie que les clés sont bien présentes et les valeurs sont Number
        if (
          typeof value.length === 'number' &&
          typeof value.upper === 'number' &&
          typeof value.lower === 'number' &&
          typeof value.number === 'number'
        ) {
          commit('passwordRequirement', value)
        }
      }
    },

    /**
     * Affiche/Cache l'overlay de chargement
     *
     * @param {Boolean} state
     */
    overlayState({ commit }, state) {
      commit('overlayState', state)
    },
  },
}
