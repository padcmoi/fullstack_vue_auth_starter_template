import { createLocalVue, shallowMount, mount, config } from '@vue/test-utils'
config.showDeprecationWarnings = false

import Vuex from 'vuex'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import { randomStr } from '../common/misc'
import expectedResponsefromApi from '../common/expected_response_from_api'
import Login from '@/views/Login.vue'
import { store_auth, store_accessibility } from '../common/store'
import store_check_form from '@/store/modules/store_check_form'

// import VueRouter from 'vue-router'
// import routes from '@/router/routes'

import { _module_describe } from './modules/index'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)
localVue.use(Vuex)
// localVue.use(VueRouter)
// const router = new VueRouter({ routes })

describe('views/Login.vue', () => {
  let modules,
    store,
    wrapper,
    password_check_requirement = {
      length: Math.floor(Math.random() * (16 - 8 + 1)) + 8,
      upper: 2,
      lower: 1,
      number: 1,
    },
    access_token = randomStr(32)

  // router.push('/login')
  const $route = {
    path: '/login',
  }

  modules = {
    store_check_form: {
      state: store_check_form.state,
      mutations: store_check_form.mutations,
      actions: {
        passwordRequirement: jest.fn(({ state, commit }) => {
          const response = expectedResponsefromApi({
            password_check_requirement,
          })

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
        }),
      },
      namespaced: true,
    },

    store_csrf: {
      actions: {
        generate: jest.fn(),
      },
      namespaced: true,
    },

    store_accessibility,

    store_auth: {
      state: store_auth.state,
      mutations: store_auth.mutations,
      actions: {
        login: jest.fn(({ commit }, form = null) => {
          const isSend = form.username && form.password ? true : false

          // On envoit une requete à l'Api pour demander la déconnexion,
          // elle répondra toujours Oui dans ce test
          const res = expectedResponsefromApi({
            isLoggedIn: isSend,
            isAdmin: false,
            access_token,
          })
          const isLoggedIn = res.data['isLoggedIn'] || false
          if (isLoggedIn && typeof isLoggedIn === 'boolean') {
            commit('isLogged', res.data['isLoggedIn'])
            commit('isAdmin', res.data['isAdmin'] || false)

            localStorage.setItem('access_token', res.data['access_token'])

            // Je n'arrive pas à utiliser mock $route au montage,
            // j'obtiens une erreur à chaque fois
            // Sur stackoverflow, il semble que c'est un bug de Jest
            // Probleme également avec VueRouter
            // $route.path = '/dashboard'
            // router.push('/dashboard')
          }
        }),
      },
      namespaced: true,
    },
  }

  store = new Vuex.Store({ modules })

  wrapper = shallowMount(Login, {
    store,
    localVue,
    // router,
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        isPasswordVisible: false,
      }
    },
    // mocks: { $route },
  })

  // Vérifie le contenu et l'ordre des boutons
  _module_describe.check_buttons_orders_login(wrapper)

  // Doit contenir un nombre de balise <INPUT>
  _module_describe.must_contain_inputs(wrapper, 2)

  // Vérifie le contenu et l'ordre des liens
  _module_describe.check_links_orders_login(wrapper)

  // Doit contenir un champ Username
  _module_describe.input_username(wrapper)

  // Doit contenir un champ Password
  _module_describe.input_password_login(wrapper)

  // Soumet un formulaire complet
  _module_describe.send_form_login(wrapper, modules, access_token)
})
