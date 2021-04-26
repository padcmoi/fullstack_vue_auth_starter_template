<template>
  <b-form-checkbox
    v-model="status"
    :value="true"
    :unchecked-value="false"
    @change="onChange"
    required
    switch
  >
    <b-form-text :text-variant="variant">{{ label }}</b-form-text>
  </b-form-checkbox>
</template>

<script>
export default {
  name: 'FormTermsAndUse',
  props: {
    label: {
      type: String,
      default: 'I accept the terms and use',
    },
    size: {
      type: String,
      default: 'md',
    },
    variant: { type: String, default: 'light' },
  },
  data() {
    return {
      status: false,
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
      this.$emit('terms-and-use', this.status)
    },
  },
}
</script>
