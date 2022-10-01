<template>
  <div :class="{ 'full-app': onRaspberry }">
    <navbar class="fixed-top"/>

    <Nuxt style="padding-top: 56px"/>
  </div>

</template>

<script>
import navbar from "../components/navbar";

export default {
  components: {navbar},
  computed: {
    onRaspberry() {
      return process.env.ENV === 'raspberry'
    },
  },
}
</script>

<style lang="scss" scoped>
//.full-app {
//  font-size: larger;
//}
//
//.full-app h5 {
//  font-size: xx-large;
//}

</style>
