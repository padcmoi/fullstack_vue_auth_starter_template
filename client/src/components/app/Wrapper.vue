<template>
  <section>
    <FormOverlay />
    <VueScrollProgressBar
      height="0.1rem"
      zIndex="9999"
      backgroundColor="linear-gradient(to right, #38C172, #51D88A)"
    />

    <header class="text-center my-0 py-0 d-none d-lg-block">
      <img alt="Vue logo" src="@/assets/vendor/logo.png" />
    </header>

    <Navbar :routes="routes" />

    <main>
      <b-container class="pt-3" fluid>
        <transition name="smoothly-transition" mode="out-in">
          <router-view />
        </transition>
      </b-container>
    </main>
  </section>
</template>

<script>
import { VueScrollProgressBar } from '@guillaumebriday/vue-scroll-progress-bar'
import routes from '@/router/routes'

export default {
  name: 'Wrapper',
  components: {
    Navbar: () => import('./Navbar'),
    FormOverlay: () => import('../FormOverlay'),
    VueScrollProgressBar,
  },
  computed: {
    routes() {
      return routes
    },
  },
}
</script>

<style lang="less" scoped>
header {
  img {
    height: 100px;
  }
}
</style>
