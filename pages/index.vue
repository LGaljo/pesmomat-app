<template>
  <div class="w-100">
    <div
      v-for="(song, i) of songs"
      :key="song.title + i"
    >
      <div
        class="offset-md-0 col-md-12 offset-lg-3 col-lg-6 py-3"
      >
        <SongCard
          :song="song"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SongCard from '../components/SongCard.vue'

export default {
  components: {SongCard},
  data() {
    return {
      songs: []
    }
  },
  methods: {

  },
  async created() {
    this.$axios.$get('/songs')
      .then(res => {
        if (res.length) {
          this.songs.push(...res);
        }
      })
      .catch(res => {
        this.$toast.error('Napaka pri pridobivanju pesmi', { duration: 10000 });
      })
  }
}
</script>

<style lang="scss" scoped>
</style>
