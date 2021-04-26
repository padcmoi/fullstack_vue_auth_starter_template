<template>
  <b-container fluid>
    <h1 v-if="hello">{{ hello }}</h1>
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <b-link href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</b-link
      >.
    </p>
    <h3>Installed CLI Plugins</h3>

    <ul>
      <li>
        <b-link
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</b-link
        >
      </li>
      <li>
        <b-link
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
          target="_blank"
          rel="noopener"
          >router</b-link
        >
      </li>
      <li>
        <b-link
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex"
          target="_blank"
          rel="noopener"
          >vuex</b-link
        >
      </li>
      <li>
        <b-link
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest"
          target="_blank"
          rel="noopener"
          >unit-jest</b-link
        >
      </li>
      <li>
        <b-link
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch"
          target="_blank"
          rel="noopener"
          >e2e-nightwatch</b-link
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <b-link href="https://vuejs.org" target="_blank" rel="noopener"
          >Core Docs</b-link
        >
      </li>
      <li>
        <b-link href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</b-link
        >
      </li>
      <li>
        <b-link href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</b-link
        >
      </li>
      <li>
        <b-link href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</b-link
        >
      </li>
      <li>
        <b-link href="https://news.vuejs.org" target="_blank" rel="noopener"
          >News</b-link
        >
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <b-link href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</b-link
        >
      </li>
      <li>
        <b-link href="https://vuex.vuejs.org" target="_blank" rel="noopener"
          >vuex</b-link
        >
      </li>
      <li>
        <b-link
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</b-link
        >
      </li>
      <li>
        <b-link
          href="https://vue-loader.vuejs.org"
          target="_blank"
          rel="noopener"
          >vue-loader</b-link
        >
      </li>
      <li>
        <b-link
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
          >awesome-vue</b-link
        >
      </li>
    </ul>
  </b-container>
</template>

<script>
import { displayNight } from '@/mixins'

export default {
  name: 'HelloWorld',
  mixins: [displayNight],
  props: {
    msg: { type: String, required: false },
    hello: { type: String, required: false, default: null },
    callMe: { type: Function },
  },
  methods: {
    test() {
      return 'HelloWorld'
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
