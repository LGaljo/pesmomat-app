<template>
  <div
    @click="openSong()"
    style="height: calc(100vh - 56px); max-height: calc(100vh - 56px);"
    class="d-flex flex-row align-items-center justify-content-center"
  >
    <transition name="fade">
      <song-card
        v-if="show && songs"
        :song="song"
        :hide-actions="true"
        :limit="30"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: "frontpage",
  layout: 'minimal',
  data() {
    return {
      index: 0,
      song: null,
      songs: [],
      show: true
    }
  },
  async created() {
    await this.getSongs();
    this.song = this.songs[this.index]
    this.index++;
    this.show = true;

    setInterval(async () => {
      this.song = this.songs[this.index]
      this.index = (this.index + 1) % this.songs.length;
      this.show = false;
      setTimeout(() => {
        this.show = true;
      }, 1000)
    }, 3000)
  },
  methods: {
    async getSongs() {
      await this.$axios.$get('/songs?favourite=true')
        .then(res => {
          if (res.length) {
            this.songs = res;
          }
        })
        .catch(res => {
          this.$toast.error('Napaka pri pridobivanju pesmi', {duration: 10000});
        })
    },
    openSong() {
      this.$router.push(`/song/${this.song?._id}`)
    },
  },
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
