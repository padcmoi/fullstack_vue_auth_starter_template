import api from '@/services/api'
import router from '@/router/index'
import { routerRightsCheck, makeToast, catchResponseToast } from '@/tools'

export default {
  namespaced: true,
  state: () => ({
    // isInitAuth: true, // Mecanisme concu pour que le router attend les données de l'Api avant routage
    isLogged: false,
    isAdmin: false,
    userId: -1,
    username: null,
    firstname: '', // not available, maybe later implementation
    lastname: '', // not available, maybe later implementation
  }),
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
  actions: {
    /**
     * Boucle les autorisations du compte
     */
    loop_check_auth({ state }) {
      setTimeout(async () => {
        if (state.isLogged) {
          await this.dispatch('store_auth/check_auth')
        }

        this.dispatch('store_auth/loop_check_auth')
      }, 1500)
    },

    /**
     * Vérifie les autorisations du compte
     */
    async check_auth({ commit, state }) {
      const res = await api.get('account/check')

      const data = {
        access_token: res.data['access_token'] || null,
        userId: res.data['userId'] || -1,
        username: res.data['username'] || null,
        firstname: res.data['firstname'] || null,
        lastname: res.data['lastname'] || null,
        isLoggedIn: res.data['isLoggedIn'] || false,
        isAdmin: res.data['isAdmin'] || false,
      }

      const to = router.currentRoute
      const wasState = {
        isLogged: state.isLogged,
        isAdmin: state.isAdmin,
      }

      commit('isLogged', data['isLoggedIn'])
      commit('isAdmin', data['isAdmin'])
      commit('username', data['username'])
      commit('firstname', data['firstname'])
      commit('lastname', data['lastname'])

      // console.log(data['firstname'])
      // console.log('state ' + state.firstname)

      if (typeof to.meta.requires !== 'undefined') {
        const condition = {
          log: !data['isLoggedIn'] && data['isLoggedIn'] !== wasState.isLogged,
          adm: !data['isAdmin'] && data['isAdmin'] !== wasState.isAdmin,
        }

        if (condition.log || condition.adm) {
          routerRightsCheck(to, router, true)
        }
      }

      if (!data['access_token']) {
        localStorage.removeItem(data['access_token'])
      }
    },

    /**
     * Login
     *
     * @param {Object} form
     */
    async login({ commit }, form) {
      this.dispatch('store_check_form/overlayState', true)

      setTimeout(async () => {
        const sendData = {
          user: form.username,
          password: form.password,
          captcha: form.captcha,
        }

        const res = await api.post('account/login', sendData)
        this.dispatch('store_debug/set', res.data || false)
        const isLoggedIn = res.data['isLoggedIn'] || false
        if (isLoggedIn && typeof isLoggedIn === 'boolean') {
          commit('isLogged', res.data['isLoggedIn'])
          commit('isAdmin', res.data['isAdmin'] || false)

          localStorage.setItem('access_token', res.data['access_token'] || '')
          router.push('/dashboard')
          makeToast({ msg: 'Connexion réussie' })
        } else {
          if (res.data['toastMessage']) {
            catchResponseToast(res.data['toastMessage'])
          }
          commit('isLogged', false)
        }
      }, 1500)
    },

    /**
     * Logout
     */
    async logout({ commit }) {
      console.log('Logout...')

      const res = await api.delete('account/logout')
      console.log(res)
      const isLogout = res.data['isLogout'] || false
      if (isLogout && typeof isLogout === 'boolean') {
        commit('isLogged', false)
        commit('isAdmin', false)
        localStorage.removeItem('access_token')
        router.push('/login')
        makeToast({ msg: 'Déconnexion réussie' })
      } else {
        commit('isLogged', false)
        makeToast({ type: 'error', msg: 'Erreur interne' })
      }
    },

    /**
     * Register
     *
     * @param {Object} form
     */
    async register({ commit }, form) {
      this.dispatch('store_check_form/overlayState', true)

      setTimeout(async () => {
        const sendData = {
          user: form.username_reg,
          password1: form.password1,
          password2: form.password2,
          email1: form.email1,
          email2: form.email2,
          firstname: form.firstname,
          lastname: form.lastname,
          captcha: form.captcha,
        }

        const res = await api.post('account/register', sendData)

        const isRegistered = res.data['isRegistered'] || false
        this.dispatch('store_debug/set', res.data || false)
        if (isRegistered && typeof isRegistered === 'boolean') {
          makeToast({
            type: 'success',
            msg: 'Compte crée, vérifiez vos mails pour activer votre compte',
          })

          router.push('/login')
        } else {
          if (res.data['toastMessage']) {
            catchResponseToast(res.data['toastMessage'])
          }
        }
      }, 3000)
    },

    /**
     * Récuperation de mot de passe
     *
     * @param {Object} form
     */
    async password_recovery({ commit }, form) {
      this.dispatch('store_check_form/overlayState', true)

      setTimeout(async () => {
        const sendData = {
          user: form.username_reg,
          email: form.email1,
          captcha: form.captcha,
        }

        const res = await api.post('account/password/recovery', sendData)
        this.dispatch('store_debug/set', sendData)

        const isNewPasswordSend = res.data['isNewPasswordSend'] || false
        if (isNewPasswordSend && typeof isNewPasswordSend === 'boolean') {
          router.push('/login')
        } else {
          // TO DO formulaire refusé par l'Api
        }
      }, 2500)
    },
  },
}
