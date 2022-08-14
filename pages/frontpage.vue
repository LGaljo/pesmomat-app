<template>
  <b-col
    @click="openSong()"
  >
    <transition name="fade">
      <song-card
        v-if="show && songs"
        :song="song"
        :hide-actions="true"
      />
    </transition>
  </b-col>
</template>

<script>
export default {
  name: "frontpage",
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
    }, 5000)
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
      console.log('open song')
      this.$router.push(`/song/${this.song?._id}`)
    }
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
