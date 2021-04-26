<template>
  <b-input-group-append is-text>
    <b-icon :icon="icon" />
  </b-input-group-append>
</template>

<script>
export default {
  name: 'InputAppendIcon',
  props: {
    icon: {
      type: String,
      require: true,
    },
  },
}
</script>
