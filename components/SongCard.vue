<template>
  <div>
    <div class="card">
      <div class="card-body text-center">
        <h5 class="title">{{ song.title }}</h5>
        <small class="author">{{ song.author }}</small>

        <p class="card-text mt-3 pb-3" v-html="song.content"></p>

        <span
          class="material-icons icon-button"
          @click.stop.prevent="printAction"
        >
          print
        </span>
        <span
          class="material-icons icon-button px-3"
          @click="showQR = true"
        >
          qr_code_2
        </span>
        <span
          class="material-icons icon-button"
          @click="play"
        >
          record_voice_over
        </span>
        <audio :id="`audioPlayer-${song._id}`" ref="audioPlayer">
          <source :src="`http://localhost:4400/songs/play/${song._id}`" type="audio/mpeg">
          Your browser does not support the audio tag.
        </audio>
      </div>
    </div>
    <QRModal
      v-if="showQR"
      @close="showQR = false"
      :url="song.url || 'http://vrabecanarhist.eu/'"
    ></QRModal>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: "SongCard",
  components: {
    QrcodeVue,
  },
  props: {
    song: Object,
  },
  data() {
    return {
      showQR: false,
      playing: false,
    }
  },
  methods: {
    async printAction() {
      await this.$axios.post(`/raspberrypi/print?songId=${this.song._id}`)
        .then(async (res) => {
          switch (res.data.message) {
            case 'Insufficient funds':
              this.$toast.error('Nezadostno število žetonov', {duration: 2000})
              break;
            case 'Song does not exist':
              this.$toast.error('Pesem ne obstaja', {duration: 2000})
              break;
            case 'Printing':
              this.$toast.success('Uspešno dodano v čakalno vrsto za tiskanje', {duration: 2000})
              break;
            default:
              this.$toast.error('Napaka pri tiskanju', {duration: 2000})
              break;
          }
          await this.$store.dispatch('coins/set')
        })
        .catch(res => {
          console.log(res)
        })
    },
    async play() {
      if (this.playing) {
        await this.$refs.audioPlayer.pause();
        this.$refs.audioPlayer.currentTime = 0;
      } else {
        await this.$refs.audioPlayer.play();
      }
      this.playing = !this.playing;
    }
  }
}
</script>

<style scoped>
.card {
  width: 100%;
}

.title {
  margin: 0;
}

.author {
  color: #646464 !important;
}

.icon-button:hover {
  cursor: pointer;
  color: grey;
}

.icon-button {
  font-size: 48px;
}
</style>
