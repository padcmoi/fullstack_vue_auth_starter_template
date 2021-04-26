<template>
  <b-navbar toggleable="lg" sticky class="b-navbar p-0" type="dark">
    <b-navbar-brand>
      <b-img
        alt="Vue logo"
        src="@/assets/vendor/logo.png"
        height="25"
        class="pl-3 d-lg-none d-xl-none bounce_effect"
      />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav fill>
        <b-nav-item
          v-for="(route, idx) in routes"
          :key="idx"
          :to="route.path"
          v-show="showIntoNav(route)"
          :exact-active-class="exactActiveClass"
          :link-classes="linkClasses"
          >{{ route.name }}
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto px-2">
        <!-- Compte/Profil menu -->
        <b-nav-item-dropdown
          v-if="store_auth.isLogged"
          class="text-center"
          right
        >
          <template #button-content>
            <strong class="text-light">{{
              Capitalize(store_auth.username)
            }}</strong>
          </template>
          <b-dropdown-item
            v-for="(route, idx) in routes"
            :key="idx"
            :to="route.path"
            v-show="showIntoDropdown(route)"
            >{{ route.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <!-- Compte/Profil menu -->

        <!-- Jour/Nuit -->
        <b-nav-form class="ml-auto py-1 bounce_effect">
          <DayNightSwitch />
        </b-nav-form>
        <!-- Jour/Nuit -->
      </b-navbar-nav>
      <!-- Right aligned nav items -->
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import { displayNight } from '@/mixins'
import { Capitalize } from '../../tools'

export default {
  name: 'Navbar',
  mixins: [displayNight],
  components: {
    DayNightSwitch: () => import('../DayNightSwitch'),
  },
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(['store_auth']),
    linkClasses() {
      return `text-light`
    },
    exactActiveClass() {
      return `${this.displayNight.background_2} ${this.displayNight.color} rounded-top border-0`
    },
  },
  methods: {
    showIntoNav(route, ignoreDropdown = false) {
      const meta = route.meta || null
      const path = route.path || null
      if (!meta || !path) return false // Une erreur dans le router Vue ?

      const isLogged = this.store_auth.isLogged
      const isAdmin = this.store_auth.isAdmin
      const requireAuth = meta.requires.auth
      const requireAnonymous = meta.requires.anonymous
      const requireAdmin = meta.requires.admin
      const requireNav = meta.requires.nav
      const isDropdown = meta.dropdown

      // Route en cours d'utilisation
      if (this.$route.path === path) return true
      // Requiert d'etre connecté
      else if (requireAuth && !isLogged) return false
      // Tentative de connexion à une page de login
      else if (isLogged && requireAnonymous) return false
      // Requiert d'etre admin et connecté
      else if (!isAdmin && requireAdmin) return false
      // Doit être affichée dans la barre de navigation
      else if (!requireNav) return false
      // Sera présent dans le menu dropdown
      else if (isDropdown && !ignoreDropdown) return false
      // Conditions respectées
      else return true
    },
    showIntoDropdown(route) {
      const meta = route.meta || null
      if (!meta) return false // Une erreur dans le router Vue ?

      const routeAvailable = this.showIntoNav(route, true)

      const isDropdown = meta.dropdown
      if (isDropdown && routeAvailable) return true
      else if (!isDropdown && routeAvailable) return false
      else return false
    },
    switchDisplay() {
      this.$store.dispatch('store_accessibility/switch_display')
    },
    Capitalize(Str) {
      return Capitalize(Str)
    },
  },
}
</script>

<style lang="less" scoped>
@MainBg: #2c3e50;

.b-navbar {
  background: @MainBg;
}
</style>
