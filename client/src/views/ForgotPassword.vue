<template>
  <b-container :class="mainClass" :style="mainStyle" fluid="lg">
    <b-card :class="bcardClass" no-body>
      <b-row no-gutters>
        <b-col class="d-none d-xl-block" xl="4">
          <b-row class="h-100">
            <b-col class="my-auto text-center my-0 py-0" sm="12">
              <b-icon
                icon="file-earmark-person"
                font-scale="12"
                :variant="displayNight.variant_2"
                class="bounce_effect"
              />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" xl="8">
          <b-card-body title="Mot de passe perdu">
            <b-card-text>
              <b-form @submit="onSubmit">
                <FormRowFullCol>
                  <b-input-group size="lg">
                    <InputPrependIcon icon="person-fill" />

                    <input
                      type="text"
                      name="username"
                      :class="
                        formControl(onRecoveryStateUsername(form.username_reg))
                      "
                      maxlength="20"
                      required
                      placeholder="Utilisateur"
                      v-model="form.username_reg"
                      @focus="onFocusUsername()"
                      @blur="onBlurUsername(form.username_reg)"
                      @input="onInputUsername()"
                      v-lowercase
                    />

                    <FormInvalidFeedback
                      class="bounce_effect"
                      label="Nom d'utilisateur inéxistant"
                      :state="onRecoveryStateUsername(form.username_reg)"
                    />
                  </b-input-group>
                </FormRowFullCol>

                <FormRowFullCol>
                  <b-input-group size="lg">
                    <InputPrependIcon icon="mailbox" />

                    <input
                      type="email"
                      name="email1"
                      :class="formControl(onStateCourriel())"
                      v-model="form.email1"
                      maxlength="50"
                      required
                      placeholder="Courriel"
                      v-lowercase
                    />

                    <FormInvalidFeedback
                      class="bounce_effect"
                      label="L'adresse de courriel est invalide"
                      :state="onStateCourriel()"
                    />
                  </b-input-group>
                </FormRowFullCol>

                <FormRowFullCol>
                  <b-button
                    :variant="displayNight.variant_2"
                    class="text-center slide_in_from_right"
                    size="lg"
                    type="submit"
                    large
                    block
                    :disabled="!isPassedCheck"
                    >Retrouver le mot de passe</b-button
                  >
                  <!--  -->
                </FormRowFullCol>
              </b-form>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

    <hr :class="hr" />

    <!-- Return to login -->
    <FormRowFullCol>
      <b-link
        tag="a"
        to="login"
        :class="[displayNight.link, 'text-right', 'slide_in_from_left']"
        >Vous avez déja un compte ?</b-link
      >
    </FormRowFullCol>
  </b-container>
</template>

<script>
import { Forms, CsrfToken, displayNight } from '@/mixins'

export default {
  name: 'ForgotPassword',
  mixins: [Forms, CsrfToken, displayNight],
  components: {
    FormRowFullCol: () => import('../components/FormRowFullCol'),
    InputPrependIcon: () => import('../components/InputPrependIcon'),
    FormInvalidFeedback: () => import('../components/FormInvalidFeedback'),
  },
  data() {
    return {
      mainClass: ['mt-5', 'pt-5'],
      mainStyle: ['max-width: 600px'],
      form: {
        username_reg: '',
        email1: '',
        captcha: '',
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
      if (this.isPassed.username) return false
      else if (!this.isPassed.email) return false
      else return true
    },
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()

      this.$store.dispatch('store_auth/password_recovery', this.form)
    },
  },
}
</script>
