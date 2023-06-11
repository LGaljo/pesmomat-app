<template>
  <div :class="{ 'full-app': onRaspberry }">
    <navbar class="fixed-top"/>

    <Nuxt style="padding-top: 120px"/>
  </div>

</template>

<script>
import navbar from "../components/navbar";

export default {
  name: 'minimal',
  components: {navbar},
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: '/css/default.css' }
      ]
    }
  },
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

body {
  background: lightgray;
  font-family: 'oblik-bold', sans-serif;
}

.custom-nav {
  background: lightgray !important;
}

.no-border > .card {
  border: none;
  background: lightgray !important;
}
</style>
