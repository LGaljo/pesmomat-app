<template>
  <div>
    <div class="card">
      <div class="card-body text-center">
        <h5 class="title">{{ song.title }}</h5>
        <small class="author">{{ song.author }}</small>

        <p class="card-text mt-3" v-html="song.content"></p>

        <span
          class="material-icons icon-button"
          @click.stop.prevent="printAction"
        >
        print
      </span>
        <span
          class="material-icons icon-button"
          @click="showQR = true"
        >
        qr_code_2
      </span>
      </div>
    </div>
    <QRModal
      v-if="showQR"
      @close="showQR = false"
      :url="song.url"
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
      showQR: false
    }
  },
  methods: {
    async printAction() {
      await this.$axios.post(`/raspberrypi/print?songId=${this.song._id}`)
    },
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
</style>
