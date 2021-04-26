<template>
  <b-overlay
    :show="store_check_form.overlayState"
    rounded="lg"
    variant="dark"
    :opacity="0.9"
    z-index="8000"
    :style="mainStyle"
    no-wrap
    fixed
  >
    <template #overlay>
      <h3 animation="cylon">
        <b-icon
          icon="stopwatch"
          font-scale="4"
          animation="cylon"
          variant="success"
        />
        <div class="text-white">Un instant...</div>
      </h3>
    </template>
  </b-overlay>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FormOverlay',
  data() {
    return {
      innerHeight: 0,
    }
  },
  computed: {
    ...mapState(['store_check_form']),
    mainStyle() {
      return {
        height: this.innerHeight + 'px',
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onResize)
    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('scroll'))
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.onResize)
  },
  methods: {
    onResize() {
      this.innerHeight = parseInt(window.innerHeight)
    },
  },
}
</script>
