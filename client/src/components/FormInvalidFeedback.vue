<template>
  <b-form-invalid-feedback tooltip :state="state"
    >{{ label }}
  </b-form-invalid-feedback>
</template>

<script>
export default {
  name: 'FormInvalidFeedback',
  props: {
    label: { type: String, required: true },
    state: { required: true },
  },
}
</script>
