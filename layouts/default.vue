<template>
  <div :class="{ 'full-app': onRaspberry }">
    <navbar class="fixed-top"/>

    <b-container style="padding-top: 120px">
      <b-row class="pt-3">
        <Nuxt/>
      </b-row>
    </b-container>

    <div class="bottom-padding">
    </div>
  </div>
</template>
<script>
import navbar from "../components/navbar";

export default {
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
      return process.env.NODE_ENV === 'raspberry'
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-padding {
  padding-top: 120px;
}

.full-app {
  font-size: larger;

  h5 {
    font-size: xx-large;
  }
}

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
