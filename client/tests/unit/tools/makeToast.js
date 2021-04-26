import { Lowercase, makeToast } from '@/tools/index'
import { shallowMount, createLocalVue } from '@vue/test-utils'
// import { BRow, BCol, BFormInput, BLink } from 'bootstrap-vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

module.exports = test(`Lowercase TeSt converti à test`, () => {
  // const makeToast = function(obj = { msg, type, duration, mustClick }) {
  makeToast({ msg: 'help' })
  expect(Lowercase('TeSt')).toBe('test')
})
