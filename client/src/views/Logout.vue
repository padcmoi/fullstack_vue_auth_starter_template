<template>
  <div>Déconnexion...</div>
</template>

<script>
export default {
  name: 'Logout',
  beforeMount() {
    this.$store.dispatch('store_auth/logout')
  },
}
</script>
