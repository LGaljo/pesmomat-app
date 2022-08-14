<template>
  <div class="offset-3 col-6 offset-md-0 col-md-12">
    <AddEditSong :id="$route.params.id"/>
  </div>
</template>

<script>
import AddEditSong from "@/components/AddEditSong";

export default {
  name: "edit_song",
  components: {AddEditSong},
}
</script>

<style scoped>

</style>
