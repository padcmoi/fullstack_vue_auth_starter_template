<template>
  <div id="app">
    <Wrapper />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    Wrapper: () => import('./components/app/Wrapper'),
  },
  computed: {
    ...mapGetters(['store_accessibility/displayNight']),
  },
}
</script>

<style lang="less">
@MainBg: #202124;
@MainColor: #dddddd;

body {
  background: @MainBg;
  color: @MainColor;
  margin: 0;
  padding: 0;

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  header {
    background: #2c3e50;
  }
}
</style>
