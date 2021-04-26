export default {
  data() {
    return {
      timeout_overlayForm: null,
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeout_overlayForm)
  },
}
