// // import { config } from '@vue/test-utils'
// // config.showDeprecationWarnings = false
import Vuex from 'vuex'
import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import expectedResponsefromApi from '../common/expected_response_from_api'
import Logout from '@/views/Logout.vue'
import { store_auth } from '../common/store'
// import { randomStr } from '../common/misc'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('views/Logout.vue', () => {
  let modules, store, wrapper

  const $route = {
    path: '/logout',
  }
  localStorage.setItem('access_token', '123456789abcdret')
  store_auth.state.isLogged = true
  store_auth.state.isAdmin = true

  modules = {
    // store_auth
    store_auth: {
      state: store_auth.state,
      mutations: store_auth.mutations,
      actions: {
        logout: jest.fn(({ commit }) => {
          // On envoit une requete à l'Api pour demander la déconnexion,
          // elle répondra toujours Oui dans ce test
          const res = expectedResponsefromApi({ isLogout: true })
          const isLogout = res.data['isLogout'] || false
          if (isLogout && typeof isLogout === 'boolean') {
            commit('isLogged', false)
            commit('isAdmin', false)
            localStorage.removeItem('access_token')
            $route.path = '/login'
          }
        }),
      },
      namespaced: true,
    },
  }

  store = new Vuex.Store({ modules })

  wrapper = shallowMount(Logout, {
    store,
    localVue,
    mocks: { $route },
  })

  it('Action du store "store_auth/logout" executé au montage de la Vue ', () => {
    expect(modules.store_auth.actions.logout).toHaveBeenCalled()
  })
  it('Suppression du jeton JWT ', () => {
    expect(localStorage.getItem('access_token')).toBeNull()
  })
  it('Retour au login', () => {
    expect(wrapper.vm.$route.path).toEqual('/login')
  })
  it('State du store "isLogged" doit être faux', () => {
    expect(modules.store_auth.state.isLogged).toBeFalsy()
  })
  it('State du store "isAdmin" doit être faux', () => {
    expect(modules.store_auth.state.isAdmin).toBeFalsy()
  })
})
