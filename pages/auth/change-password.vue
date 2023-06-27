<template>
  <b-container>
    <b-row>
      <b-col offset-md="3" md="6" cols="12" class="my-3">
        <ChangePass type="ext" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChangePass from "../../components/ChangePass.vue";

export default {
  name: "change-password",
  components: {ChangePass}
}
</script>

<style scoped>

</style>
