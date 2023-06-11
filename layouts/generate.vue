<template>
  <div :class="{ 'full-app': onRaspberry }" class="generate">
    <navbar class="fixed-top" pagetype="generate"/>

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
        { rel: 'stylesheet', href: '/css/generate.css' }
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

</style>
