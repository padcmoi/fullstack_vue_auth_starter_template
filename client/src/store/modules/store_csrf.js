import api from '../../services/api'
import { getRandomStr, getCsrfToken, setCsrfToken, makeToast } from '@/tools'

export default {
  namespaced: true,
  state: () => ({
    old_token: null,
    token: '',
  }),
  mutations: {
    updateNewToken(state, payload) {
      state.token = payload || ''
    },
    updateOldToken(state, payload) {
      state.old_token = payload || null
    },
  },
  actions: {
    /**
     * Génére un jeton, soumet l'ancien jeton afin de le néttoyer en base de données
     * cette dernière action simplifie la gestion des jetons périmés
     *
     * NOTE IMPORTANTE, normalement la method request devrait être en POST,
     * mais l'api express refuse de générer un jeton via le paquetage csurf
     * si la method n'est pas GET
     */
    async generate({ commit, state }) {
      const response = await api.get('csrf/generate', {
        csrf_token: state.old_token,
      })

      if (response.data['csrf_token']) {
        commit('updateNewToken', response.data['csrf_token'])
        commit('updateOldToken', response.data['csrf_token'])
        setCsrfToken(state.token)
      } else {
        commit('updateNewToken')
        commit('updateOldToken')
        setCsrfToken('')
      }
    },

    /**
     * Renouvelle uniquement la date d'expiration du jeton en base de données
     */
    async renew({ commit, state }) {
      const response = await api.put('csrf/renew', {}, false)

      const token = state.old_token

      // Si on constate le cas éventuel mais techniquement impossible
      if (
        !response.data['is_validated'] &&
        typeof token === 'string' &&
        typeof response.data['is_validated'] === 'boolean'
      ) {
        makeToast({
          type: 'error',
          msg:
            "Le jeton d'entête est invalide.<br/>" +
            '- soit votre jeton a été supprimé en double utilisation<br/>' +
            '- soit il a expiré suite à une déconnexion prolongée',
          mustClick: true,
        })

        commit('updateOldToken')
      }
    },
  },
}
