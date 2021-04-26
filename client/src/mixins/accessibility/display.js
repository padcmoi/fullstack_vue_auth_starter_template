import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['store_accessibility/displayNight']),

    displayNight() {
      return this['store_accessibility/displayNight']
    },
  },
}
