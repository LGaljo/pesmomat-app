<template>
  <div v-if="song">
    <div v-if="isAdmin && !hideActions" class="mb-2">
      <nuxt-link :to="`/admin/songs/${song._id}`">
        <b-btn>
          {{ $t('actions.edit') }}
        </b-btn>
      </nuxt-link>
    </div>
    <div v-if="!hideActions && song.contents.length > 1">
      <div>{{ $t('songs.read_lang') }}</div>
      <div class="d-flex flex-row">
        <template v-for="content in song.contents">
          <div class="fake-button mr-2">
            <b-img v-bind="{ height: 48 }" @click="changeLang(content.language)" :src="flags[content.language]" >
            </b-img>
          </div>
        </template>
      </div>
    </div>
    <div class="card">
      <div class="card-body text-center">
        <div v-if="!hideActions" class="mb-4">
          <span
            class="material-icons icon-button px-2"
            @click.stop.prevent="printAction"
          >
            print
          </span>
          <span
            v-if="song.url"
            class="material-icons icon-button px-2"
            @click="showQR = true"
          >
            qr_code_2
          </span>
          <span
            class="material-icons icon-button px-2"
            :class="{ active: playing }"
            @click="play"
          >
            record_voice_over
          </span>
          <audio :id="`audioPlayer-${song._id}`" ref="audioPlayer" preload @ended="playing = false">
            <source :src="`${apiUrl}/songs/play/${song._id}`" type="audio/mpeg">
            Your browser does not support the audio tag.
          </audio>
        </div>
        <h5 class="title">{{ song.title }}</h5>
        <small class="author">{{ song.author.lastName }} {{ song.author.firstName }}</small>

        <p class="card-text mt-3 pb-3" v-html="currentContent"></p>
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
import QRModal from "./QRModal";
import admin from "../mixins/admin";
import flags from "../mixins/flags";

export default {
  name: "SongCard",
  mixins: [admin, flags],
  components: {
    QrcodeVue,
    QRModal
  },
  props: {
    song: Object,
    hideActions: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
    }
  },
  data() {
    return {
      showQR: false,
      playing: false,
      currentLang: null,
      currentContent: ''
    }
  },
  computed: {
    apiUrl() {
      return process.env.API_URL
    },
  },
  mounted() {
    this.currentLang = this.$i18n.locale;
    this.createExcerpt()
  },
  methods: {
    changeLang(locale) {
      this.currentLang = locale
      this.createExcerpt()
    },
    async printAction() {
      await this.$axios.post(`/raspberrypi/print?songId=${this.song._id}`)
        .then(async (res) => {
          switch (res.data.message) {
            case 'Insufficient funds':
              this.$toast.error(this.$t('errors.insufficient'), {duration: 2000})
              break;
            case 'Song does not exist':
              this.$toast.error(this.$t('errors.nonexistent'), {duration: 2000})
              break;
            case 'Printing':
              this.$toast.success(this.$t('errors.sent'), {duration: 2000})
              break;
            default:
              this.$toast.error(this.$t('errors.print'), {duration: 2000})
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
    },
    createExcerpt() {
      if (!this.song?.contents?.length) {
        this.currentContent = this.song?.content
        console.log(this.currentContent)
        return
      }
      let content = this.song?.contents?.find(c => c.language === this.currentLang)?.content
      if (!!this.limit && content?.split('<br>').length > this.limit) {
        content = content?.split('<br>').slice(0, this.limit).join('<br>') + '<br><br>...';
      }
      this.currentContent = content
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

.active {
  color: goldenrod;
}
</style>
