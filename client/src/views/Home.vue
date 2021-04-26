<template>
  <div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    HelloWorld: () => import('@/components/HelloWorld.vue'),
  },
}
</script>
