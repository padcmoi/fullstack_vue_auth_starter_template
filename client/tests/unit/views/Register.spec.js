import { createLocalVue, shallowMount, mount, config } from '@vue/test-utils'
config.showDeprecationWarnings = false

import Vuex from 'vuex'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
// import VueRouter from 'vue-router'
// import routes from '@/router/routes'

import { randomStr } from '../common/misc'
import expectedResponsefromApi from '../common/expected_response_from_api'
import Register from '@/views/Register.vue'
import { store_auth, store_accessibility } from '../common/store'
import store_check_form from '@/store/modules/store_check_form'

import { _module_describe } from './modules/index'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)
localVue.use(Vuex)
// localVue.use(VueRouter)
// const router = new VueRouter({ routes })

describe('views/Register.vue', () => {
  let modules,
    store,
    wrapper,
    password_check_requirement = {
      length: Math.floor(Math.random() * (16 - 8 + 1)) + 8,
      upper: 2,
      lower: 1,
      number: 1,
    },
    gen_password = randomStr(8),
    submitForm = {
      username_reg: 'JohnDoE',
      password1: gen_password,
      password2: gen_password,
      email1: 'test@Localhost.fr',
      email2: 'test@LocalHost.fr',
      firstname: 'JohN',
      lastname: 'DoE',
    }

  // router.push('/register')
  const $route = {
    path: '/register',
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
        register: jest.fn(({}, _form) => {
          const isValid = JSON.stringify(submitForm) === JSON.stringify(_form)

          // On envoit une fausse requete à l'Api
          const res = expectedResponsefromApi({
            isRegistered: isValid,
          })

          const isRegistered = res.data['isRegistered'] || false
          if (isRegistered && typeof isRegistered === 'boolean') {
            localStorage.setItem('accountCreated', JSON.stringify(_form))

            // Je n'arrive pas à utiliser mock $route au montage,
            // j'obtiens une erreur à chaque fois
            // Sur stackoverflow, il semble que c'est un bug de Jest
            // Probleme également avec VueRouter
            // $route.path = '/login'
            // router.push('/login')
          } else {
            localStorage.removeItem('accountCreated')
          }
        }),
      },
      namespaced: true,
    },
  }

  store = new Vuex.Store({ modules })

  wrapper = shallowMount(Register, {
    store,
    localVue,
    // router,
    data() {
      return {
        form: {
          username_reg: '',
          password1: '',
          password2: '',
          email1: '',
          email2: '',
          firstname: '',
          lastname: '',
        },
        isPasswordVisible: false,
        generated_password: '',
      }
    },
    methods: {
      passwordGenerator(size = 8) {
        this.generated_password = randomStr(size)

        this.form.password1 = this.generated_password
        this.form.password2 = this.generated_password
      },
    },
    // mocks: { $route },
  })

  // Vérifie le contenu et l'ordre des boutons
  _module_describe.check_buttons_orders_register(wrapper)

  // Doit contenir un nombre de champs
  _module_describe.must_contain_inputs(wrapper, 7)

  // Vérifie le contenu et l'ordre des liens
  _module_describe.check_links_orders_register(wrapper)

  // Doit contenir un champ Username
  _module_describe.input_username(wrapper)

  // Doit contenir 2 champs Password
  _module_describe.input_password_register(wrapper)

  // Doit contenir un champ Email
  _module_describe.input_email(wrapper, 'email1', 'email2')

  // Doit contenir un champ firstname
  _module_describe.input_firstname(wrapper)

  // Doit contenir un champ lastname
  _module_describe.input_lastname(wrapper)

  // Soumet un formulaire
  _module_describe.send_form_register(wrapper, submitForm)
})
