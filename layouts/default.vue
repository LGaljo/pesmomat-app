<template>
  <div>
    <navbar/>

    <div class="container">
      <div class="row pt-3">
        <Nuxt/>
      </div>
    </div>


    <div class="bottom-padding">
    </div>

  </div>
</template>
<script>
import navbar from "../components/navbar";

export default {
  components: {navbar},
}

</script>

<style lang="scss" scoped>
.bottom-padding {
  padding-top: 120px;
}
</style>
