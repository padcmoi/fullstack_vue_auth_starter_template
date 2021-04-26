<template>
  <b-container :class="mainClass" :style="mainStyle" fluid="lg">
    <b-card no-body :class="bcardClass">
      <b-row no-gutters>
        <b-col class="d-none d-xl-block" xl="4">
          <b-row class="h-100">
            <b-col class="my-auto text-center my-0 py-0" sm="12">
              <b-icon
                icon="door-open-fill"
                font-scale="12"
                :variant="displayNight.variant_2"
                class="bounce_effect"
              />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" xl="8">
          <b-card-body title="Connexion">
            <b-card-text>
              <b-form @submit="onSubmit">
                <FormRowFullCol>
                  <b-input-group size="lg">
                    <InputPrependIcon icon="person-fill" />

                    <input
                      type="text"
                      name="username"
                      :class="formControl(null)"
                      placeholder="Utilisateur"
                      v-model="form.username"
                      autocomplete="true"
                      maxlength="20"
                      required
                      v-lowercase
                    />
                  </b-input-group>
                </FormRowFullCol>

                <FormRowFullCol>
                  <b-input-group size="lg">
                    <InputPrependIcon icon="key-fill" />

                    <input
                      :type="passwordFieldType"
                      name="password"
                      :class="formControl(null)"
                      placeholder="Mot de passe"
                      v-model="form.password"
                      autocomplete="true"
                      required
                    />

                    <b-input-group-append>
                      <b-button
                        name="show-password"
                        :variant="displayNight.variant_2"
                        @click="showPassword()"
                        class="bounce_effect"
                      >
                        <b-icon :icon="iconPasswordVisible" class="zoom" />
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </FormRowFullCol>

                <FormRowFullCol>
                  <b-button
                    name="submit"
                    :variant="displayNight.variant_2"
                    class="text-center slide_in_from_right"
                    size="lg"
                    type="submit"
                    large
                    block
                  >
                    Se connecter
                  </b-button>

                  <!--  -->
                </FormRowFullCol>
              </b-form>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

    <hr :class="hr" />

    <!-- Return to forget password -->
    <FormRowFullCol>
      <b-link
        tag="a"
        to="forgot-password"
        :class="[displayNight.link, 'text-right', 'slide_in_from_left']"
        >Mot de passe oublié ?</b-link
      >
      <!--  -->
    </FormRowFullCol>

    <!-- Return to register -->
    <FormRowFullCol class="text-right">
      <b-link
        tag="a"
        to="register"
        :class="[displayNight.link, 'text-right', 'slide_in_from_left']"
        >Vous n'avez pas de compte ?</b-link
      >

      <!--  -->
    </FormRowFullCol>
  </b-container>
</template>

<script>
import { Forms, CsrfToken, displayNight } from '@/mixins'

export default {
  name: 'Login',
  mixins: [Forms, CsrfToken, displayNight],
  components: {
    FormRowFullCol: () => import('../components/FormRowFullCol'),
    InputPrependIcon: () => import('../components/InputPrependIcon'),
  },
  data() {
    return {
      mainClass: ['mt-5', 'pt-5'],
      mainStyle: ['max-width: 600px'],
      form: {
        username: '',
        password: '',
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
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()

      // console.log('onSubmit: ' + JSON.stringify(this.form))
      this.$store.dispatch('store_auth/login', this.form)
    },
  },
}
</script>
