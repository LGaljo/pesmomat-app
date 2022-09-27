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
        class="no-border"
      />
    </transition>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
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
    }, Number(process.env.SLIDESHOW_INTERVAL))
  },
  computed: {
    ...mapGetters({
      coins: 'coins/get',
    })
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
    async openSong() {
      if (this.coins > 0) {
        await this.$store.dispatch('coins/reduce');
        await this.$router.push(`/song/${this.song?._id}`)
      } else {
        this.$toast.info('Za ogled, tiskanje in poslušanje pesmi prosim vstavite kovanec.', { duration: 2500 })
      }
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
.no-border {
  border: none;
}
</style>
