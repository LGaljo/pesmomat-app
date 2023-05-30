<template>
  <div>
    <div
      @click="openSongRequest"
      style="height: calc(100vh - 56px); max-height: calc(100vh - 56px);"
      class="d-flex flex-row align-items-center justify-content-center"
    >
      <transition name="fade">
        <song-card
          v-if="show && songs"
          :song="song"
          :hide-actions="true"
          :limit="25"
          class="no-border"
        />
      </transition>
    </div>

    <b-modal v-model="showModal" hide-footer :title="$t('modals.insufficient.title')">
      <p>{{ $t('modals.insufficient.body')}}</p>
      <b-button class="mt-2" variant="warning" block @click="showModal = false">{{ $t('actions.understand') }}</b-button>
    </b-modal>
    <b-modal v-model="showModalUse" hide-footer :title="$t('modals.purchase.title')">
      <p>{{ $t('modals.purchase.body')}}</p>
      <div class="mt-2 d-flex justify-content-between">
        <b-button class="mr-2" variant="warning" block @click="showModalUse = false">{{ $t('actions.cancel') }}</b-button>
        <b-button class="ml-2 mt-0" variant="primary" block @click="openSong">{{ $t('actions.understand') }}</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import SongCard from "../components/SongCard";

export default {
  name: 'index',
  layout: 'minimal',
  components: { SongCard },
  data() {
    return {
      index: 0,
      song: null,
      songs: [],
      show: true,
      showModal: false,
      showModalUse: false,
      songId: null,
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
        .catch(() => {
          this.$toast.error('Napaka pri pridobivanju pesmi', {duration: 10000});
        })
    },
    async openSongRequest() {
      this.songId = this.song?._id
      if (this.coins > 0) {
        this.showModalUse = true
      } else {
        this.showModal = true;
      }
    },
    async openSong() {
      this.showModalUse = false
      await this.$store.dispatch('coins/reduce')
      await this.$router.push(this.localePath(`/song/${this.songId}`))
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
.no-border {
  border: none;
}
</style>
