<template>
  <div v-if="song">
    <div v-if="isAdmin && !hideActions" class="mb-2">
      <nuxt-link :to="`/admin/songs/${song._id}`">
        <b-btn>
          {{ $t('actions.edit') }}
        </b-btn>
      </nuxt-link>
    </div>
    <div class="card">
      <div class="card-body text-center">
        <div v-if="!hideActions" class="mb-4">
          <span
            v-if="song.contents.length > 1"
            class="material-icons icon-button px-2"
            style="width: 64px;"
            @click="showLangSwitch = true"
          >
            translate_variant
          </span>
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
    />

    <LanguageSwitchModal v-if="showLangSwitch" @close="changeLang($event); showLangSwitch = false;"/>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import QRModal from "./QRModal";
import admin from "../mixins/admin";
import flags from "../mixins/flags";
import LanguageSwitchModal from "./LanguageSwitchModal.vue";

export default {
  name: "SongCard",
  mixins: [admin, flags],
  components: {
    LanguageSwitchModal,
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
      showLangSwitch: false,
      playing: false,
      currentLang: null,
      currentContent: ''
    }
  },
  computed: {
    apiUrl() {
      return process.env.API_URL
    },
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
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
      // Old place for content
      if (!this.song?.contents?.length) {
        this.currentContent = this.song?.contents
        return
      }
      let content = this.song?.contents?.find(c => c.lang.startsWith(this.currentLang))?.content
      if (!content) {
        content = this.song?.contents[0]?.content
      }
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
