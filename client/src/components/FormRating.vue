<template>
  <b-input-group>
    <b-input-group-prepend v-if="label" is-text>
      {{ label }}
    </b-input-group-prepend>

    <b-form-rating
      inline
      v-model="value"
      @change="onChange"
      :size="Size"
      show-clear
      :variant="variant"
    />
  </b-input-group>
</template>

<script>
// <FormRating
//   v-on:form-rating="onRating"
//   label="Pouvez-vous noter ce formulaire"
//   emitkey="form-rating"
//   size="lg"
//   variant="info"
// />

export default {
  name: 'FormRating',
  props: {
    label: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'md',
    },
    variant: {
      type: String,
      default: 'dark',
    },
    emitkey: {
      type: String,
      default: 'form-rating',
    },
  },
  data() {
    return {
      value: null,
    }
  },
  computed: {
    Size() {
      let result = 'md'

      switch (this.size) {
        case 'sm':
          result = 'sm'
          break
        case 'md':
          result = 'md'
          break
        case 'lg':
          result = 'lg'
          break
      }
      return result
    },
  },
  methods: {
    onChange() {
      this.$emit(this.emitkey, this.value)
    },
  },
}
</script>
