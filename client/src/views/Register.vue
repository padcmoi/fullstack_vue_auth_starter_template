<template>
  <b-container :class="mainClass" :style="mainStyle" fluid="lg">
    <b-card :class="bcardClass" no-body>
      <b-row no-gutters>
        <b-col class="d-none d-xl-block" xl="3">
          <b-row class="h-75">
            <b-col class="my-auto text-center my-0 py-0" sm="12">
              <b-icon
                icon="person-badge-fill"
                font-scale="15"
                :variant="displayNight.variant_2"
                class="bounce_effect"
              />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" xl="9">
          <b-card-body title="Inscription">
            <b-card-text>
              <b-form @submit="onSubmit">
                <!-- Username -->
                <FormRowHalfCol>
                  <template v-slot:left>
                    <InputPrependIcon icon="person-fill" />
                    <input
                      type="text"
                      name="username"
                      :class="formControl(onStateUsername(form.username_reg))"
                      placeholder="Utilisateur"
                      v-model="form.username_reg"
                      @focus="onFocusUsername()"
                      @blur="onBlurUsername(form.username_reg)"
                      @input="onInputUsername()"
                      maxlength="20"
                      required
                      v-lowercase
                    />
                    <FormInvalidFeedback
                      class="bounce_effect"
                      label="Nom d'utilisateur indisponible"
                      :state="onStateUsername(form.username_reg)"
                    />
                  </template>
                </FormRowHalfCol>

                <!-- Password -->
                <FormRowDualCol>
                  <template v-slot:left>
                    <InputPrependIcon icon="key-fill" />

                    <input
                      type="text"
                      name="password1"
                      :class="formControl(onStatePassword())"
                      placeholder="Mot de passe"
                      v-model="form.password1"
                      @input="onInputPassword()"
                      required
                    />

                    <b-input-group-append>
                      <b-button
                        name="show-password"
                        :variant="displayNight.variant_2"
                        @click="passwordGenerator(8)"
                        class="bounce_effect"
                      >
                        <b-icon icon="tools" class="zoom" />
                      </b-button>
                    </b-input-group-append>
                  </template>
                  <template v-slot:right>
                    <InputPrependIcon icon="key-fill" />

                    <input
                      type="text"
                      name="password2"
                      :class="formControl(onStatePassword())"
                      placeholder="Confirmer mot de passe"
                      v-model="form.password2"
                      @input="onInputPassword()"
                      required
                    />

                    <FormInvalidFeedback
                      class="bounce_effect"
                      label="Mot de passe trop faible ou ne correspond pas"
                      :state="onStatePassword()"
                    />
                  </template>
                </FormRowDualCol>

                <!-- Courriel -->
                <FormRowDualCol>
                  <template v-slot:left>
                    <InputPrependIcon icon="mailbox" />

                    <input
                      type="email"
                      name="email1"
                      :class="formControl(onStateCourriels())"
                      @input="onInputCourriel()"
                      @blur="onBlurCourriel(form.email1)"
                      placeholder="Courriel"
                      v-model="form.email1"
                      v-lowercase
                      maxlength="50"
                      required
                    />
                  </template>
                  <template v-slot:right>
                    <InputPrependIcon icon="mailbox" />

                    <input
                      type="email"
                      name="email2"
                      :class="formControl(onStateCourriels())"
                      placeholder="Confirmer adresse de Courriel"
                      v-model="form.email2"
                      v-lowercase
                      maxlength="50"
                      required
                    />

                    <FormInvalidFeedback
                      class="bounce_effect"
                      :label="errorFormMsg.email"
                      :state="onStateCourriels()"
                    />
                  </template>
                </FormRowDualCol>

                <!-- lastName -->
                <FormRowDualCol>
                  <template v-slot:left>
                    <InputPrependIcon icon="person-badge-fill" />

                    <input
                      type="text"
                      name="firstname"
                      :class="formControl(null)"
                      placeholder="Prénom"
                      v-model="form.firstname"
                      v-capitalize
                      maxlength="30"
                    />
                  </template>
                  <template v-slot:right>
                    <InputPrependIcon icon="person-badge-fill" />

                    <input
                      type="text"
                      name="lastname"
                      :class="formControl(null)"
                      placeholder="Nom"
                      v-model="form.lastname"
                      v-uppercase
                      maxlength="30"
                    />
                  </template>
                </FormRowDualCol>

                <!-- TermsandUse -->
                <FormRowHalfCol>
                  <template v-slot:left>
                    <FormTermsAndUse
                      v-on:terms-and-use="onTermsAndUse"
                      label="J'accepte les conditions d'utilisations"
                      class="my-2 slide_in_from_left"
                      :variant="displayNight.color"
                    />
                  </template>
                </FormRowHalfCol>

                <!-- Create -->

                <FormRowHalfCol>
                  <template v-slot:left>
                    <b-button
                      name="submit"
                      :variant="displayNight.variant_2"
                      class="text-center slide_in_from_right"
                      size="lg"
                      type="submit"
                      large
                      block
                      :disabled="!isPassedCheck"
                      >{{ capitalize('création du compte ...') }}
                    </b-button>
                  </template>
                </FormRowHalfCol>

                <!-- <div>{{ isPassed }}</div> -->
              </b-form>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

    <hr :class="hr" />

    <!-- Return to login -->
    <FormRowHalfCol>
      <template v-slot:left>
        <b-link
          tag="a"
          to="login"
          :class="[displayNight.link, 'slide_in_from_left']"
          >Vous avez déja un compte ?</b-link
        >
      </template>
    </FormRowHalfCol>
  </b-container>
</template>

<script>
import { Forms, CsrfToken, displayNight } from '@/mixins'

export default {
  name: 'Register',
  mixins: [Forms, CsrfToken, displayNight],
  components: {
    FormRowDualCol: () => import('../components/FormRowDualCol'),
    FormRowHalfCol: () => import('../components/FormRowHalfCol'),
    InputPrependIcon: () => import('../components/InputPrependIcon'),
    FormTermsAndUse: () => import('../components/FormTermsAndUse'),
    FormInvalidFeedback: () => import('../components/FormInvalidFeedback'),
  },
  data() {
    return {
      mainClass: ['mt-5'],
      mainStyle: ['max-width: 1100px'],
      form: {
        username_reg: '',
        password1: '',
        password2: '',
        email1: '',
        email2: '',
        firstname: '',
        lastname: '',
        // captcha: '',
        // username_reg: 'abc_1',
        // password1: 'wPx@p2RmP',
        // password2: 'wPx@p2RmP',
        // email1: 'test@naskot.fr',
        // email2: 'test@naskot.fr',
        // firstname: 'firstname',
        // lastname: 'lastname',
        // captcha: '',
      },
    }
  },
  computed: {
    hr() {
      return [this.displayNight.background_3, 'hr-50']
    },
    bcardClass() {
      return [
        this.displayNight.background_2,
        this.displayNight.border_2,
        'shadow',
        'rounded',
        'p-2',
        'mb-4',
      ]
    },
    isPassedCheck() {
      if (!this.isPassed.termsanduse) return false
      else if (!this.isPassed.username) return false
      else if (!this.isPassed.password) return false
      else if (!this.isPassed.email) return false
      else return true
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()

      this.$store.dispatch('store_auth/register', this.form)
    },
  },
}
</script>
