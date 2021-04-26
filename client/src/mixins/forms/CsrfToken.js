export default {
  data() {
    return {
      timeout_renew_csrf: null,
    }
  },
  async beforeMount() {
    await this.$store.dispatch('store_csrf/generate')
    await this.renew_csrf_loop()
  },
  beforeDestroy() {
    clearTimeout(this.timeout_renew_csrf)
    delete this.timeout_renew_csrf
  },
  methods: {
    async renew_csrf_loop() {
      this.timeout_renew_csrf = setTimeout(async () => {
        await this.$store.dispatch('store_csrf/renew')
        this.renew_csrf_loop()
      }, 60000)
    },
  },
}
