import {
  checkPasswords,
  checkEmail,
  Lowercase,
  Uppercase,
  Capitalize,
  makeToast,
  passwordGenerator,
} from '../../tools'

import { mapState } from 'vuex'

export default {
  data() {
    return {
      isPasswordVisible: false,
      isPassed: {
        username: false,
        async_username: false,
        password: false,
        email: false,
        captcha: false,
        termsanduse: false,
      },
      errorFormMsg: {
        email: "L'adresse de courriel est invalide ou ne correspond pas",
      },
    }
  },
  beforeMount() {
    this.$store.dispatch('store_check_form/passwordRequirement')
  },
  beforeDestroy() {
    this.form = null
    this.$store.dispatch('store_debug/set')
  },
  computed: {
    ...mapState(['store_check_form']),
    passwordFieldType() {
      return this.isPasswordVisible ? 'text' : 'password'
    },
    iconPasswordVisible() {
      return this.isPasswordVisible ? 'eye-slash-fill' : 'eye-fill'
    },
  },
  methods: {
    // change le type d'input d'un champs password en text ou password
    showPassword() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
    // change le type d'input d'un champs password en text ou password
    // Check Termsanduse
    onTermsAndUse(state) {
      this.isPassed.termsanduse = state
    },
    // Check Termsanduse
    //
    // Check Username
    onStateUsername(username) {
      if (!username || username.length === 0 || this.isPassed.async_username) {
        this.isPassed.username = null
        return null
      }
      const state = this.store_check_form.usernameAvailable
      this.isPassed.username = state
      return state
    },
    onRecoveryStateUsername(username) {
      const state = this.onStateUsername(username)

      return state === null ? state : !state
    },
    onFocusUsername() {
      this.isPassed.username = null
    },
    onBlurUsername(username) {
      this.isPassed.async_username = false
      if (!username || username.length === 0) {
        this.isPassed.username = null
        return null
      }
      this.$store.dispatch('store_check_form/usernameAvailable', username)
      const state = this.store_check_form.usernameAvailable
      this.isPassed.username = state
      return state
    },
    onInputUsername() {
      this.isPassed.async_username = true
    },
    // Check Username
    //
    // Check Password
    onStatePassword() {
      const state = checkPasswords(this.form.password1, this.form.password2)
      this.isPassed.password = state

      return state
    },
    onInputPassword() {
      const state = checkPasswords(this.form.password1, this.form.password2)

      if (
        !state &&
        this.form.password1 === this.form.password2 &&
        this.form.password1.length > 0
      ) {
        const v = this.store_check_form.passwordRequire
        const msg = `
          <strong>Indice de mot de passe requis (minimum):</strong>
          <ul>
            <li>${v.length} caractère(s)</li>
            <li>${v.upper} majuscule(s)</li>
            <li>${v.lower} minuscule(s)</li>
            <li>${v.number} chiffre(s)</li>
          </ul>
        `

        makeToast({ type: 'error', msg, duration: 10000 })
      }
    },
    // Check Password
    //
    // Check Courriel
    onInputCourriel() {
      this.form.email2 = ''
    },
    onBlurCourriel(mail) {
      this.$store.dispatch('store_check_form/courrielAvailable', mail)
    },
    onStateCourriel() {
      const mail1 = this.form.email1 || null
      if (!mail1) {
        this.isPassed.email = false
        return null
      } else {
        let state = this.store_check_form.courrielAvailable
        if (state) {
          state = checkEmail(mail1)
          if (!state) {
            this.errorFormMsg.email = "L'adresse email est invalide"
          }
        } else {
          this.errorFormMsg.email = "L'adresse email est indisponible"
        }

        this.isPassed.email = state
        return state
      }
    },
    onStateCourriels() {
      const mail1 = this.form.email1 || null
      const mail2 = this.form.email2 || null

      if (mail1 !== mail2) {
        this.errorFormMsg.email = 'Les adresses emails ne correspondent pas'
        this.isPassed.email = false
        return false
      } else {
        const state = this.onStateCourriel()
        this.isPassed.email = state
        return state
      }
    },
    // Check Courriel
    //
    // Misc ...
    passwordGenerator(size = 10, specialChars = '@') {
      const result = passwordGenerator(size, specialChars)

      this.form.password1 = result
      this.form.password2 = result
    },
    upperCase(Str) {
      return Uppercase(Str)
    },
    lowerCase(Str) {
      return Lowercase(Str)
    },
    capitalize(Str) {
      return Capitalize(Str)
    },

    formControl(state = null) {
      // form-control is-invalid
      // form-control is-valid
      // form-control
      let classes = 'form-control'
      if (typeof state === 'boolean') {
        if (state) {
          classes += ' is-valid'
        } else {
          classes += ' is-invalid'
        }
      }

      return classes
    },
  },
  directives: {
    lowercase: {
      update(el) {
        el.value = el.value.toLowerCase()
      },
    },
    uppercase: {
      update(el) {
        el.value = el.value.toUpperCase()
      },
    },
    capitalize: {
      update(el) {
        const lowerCase = el.value.toLowerCase()
        el.value = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)
      },
    },
  },
}
