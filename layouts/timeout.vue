<template>
  <div :class="{ 'full-app': onRaspberry }">
    <navbar class="fixed-top"/>

    <b-container style="padding-top: 56px">
      <b-row class="pt-3">
        <Nuxt/>
      </b-row>
    </b-container>

    <div class="bottom-padding">
    </div>

    <div class="back-button">
      <b-button variant="primary" class="btn-lg btn-dark" @click="$router.back()">Nazaj</b-button>
    </div>
  </div>
</template>
<script>
import navbar from "../components/navbar";
import timeout from "@/mixins/timeout";

export default {
  components: {navbar},
  mixins: [
    timeout
  ],
  watch: {
    $route(_to, _from) {
      this.onReroute();
    },
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

.back-button {
  position: fixed;
  bottom: 30px;
  left: 30px;
}
//
//.full-app {
//  font-size: larger;
//}
//
//.full-app h5 {
//  font-size: xx-large;
//}

</style>
