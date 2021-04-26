<template>
  <b-card
    :class="mainClass"
    :style="mainStyle"
    v-show="this['store_debug/get']"
  >
    <template #header>
      <b-row>
        <b-col cols="8"> {{ mainHeader }}</b-col>
        <b-col cols="4">
          <div class="text-right">
            <b-button @click="close()" size="sm" variant="danger">
              <b-icon icon="x" variant="light" scale="3"
            /></b-button></div
        ></b-col>
      </b-row>
    </template>

    <pre class="text-warning">{{ this['store_debug/get'] }}</pre>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['store_debug/get']),
  },
  data() {
    return {
      mainClass: [
        'bg-dark',
        'text-warning',
        'text-left',
        'position-fixed',
        'border-warning',
      ],
      mainStyle: [
        'bottom: 0',
        'right: 0',
        'width: 100%',
        'max-width: 800px',
        'height: 20%',
        'z-index: 9999',
        'overflow: auto',
      ],
      mainHeader: 'DÉBOGAGE / RETOUR',
    }
  },
  methods: {
    close() {
      this.$store.dispatch('store_debug/set')
    },
  },
}
</script>
