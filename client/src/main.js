import Vue from 'vue'
import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/common.less'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

export default vm
