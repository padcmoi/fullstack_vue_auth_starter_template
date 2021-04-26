import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { routerRightsCheck, routerRightsCheckNext } from '../tools'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    setTimeout(() => {
      const smoothSlide = document.querySelector('#app')
      if (smoothSlide) {
        smoothSlide.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }, 150)
  },
})

router.beforeResolve(async (to, from, next) => {
  next()
})

router.beforeEach(async (to, from, next) => {
  await routerRightsCheckNext(to, router, next)
})

router.afterEach(async (to, from) => {
  await routerRightsCheck(to, router)
})

export default router
