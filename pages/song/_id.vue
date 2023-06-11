<template>
<b-container>
  <b-row>
    <b-col cols="12">
      <song-card v-if="song" :song="song" class="no-border" />
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import songCard from "../../components/SongCard";

export default {
  name: "song_page",
  components: { songCard },
  data() {
    return {
      song: null
    }
  },
  async created() {
    this.song = await this.$axios.$get(`/songs/${this.$route.params.id}`)
  }
}
</script>

<style scoped>

</style>
