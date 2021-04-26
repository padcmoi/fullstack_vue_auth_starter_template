<template>
  <b-input-group-prepend is-text>
    <b-icon :icon="icon" />
  </b-input-group-prepend>
</template>

<script>
export default {
  name: 'InputPrependIcon',
  props: {
    icon: {
      type: String,
      require: true,
    },
  },
}
</script>
