<template>
  <div>
    <navbar/>
    <Nuxt />
  </div>

</template>

<script>
import navbar from "../components/navbar";
import timeout from "@/mixins/timeout";

export default {
  components: {navbar},
}
</script>

<style scoped>

</style>
