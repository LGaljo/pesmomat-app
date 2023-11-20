<template>
  <div v-if="song">
    <b-card class="w-100 h-100">
      <b-card-body>
        <div :class="{'content-overflow': !limit}" class="thin-scrollbar">
          <div class="text-center">
            <div class="author">{{ song.author.lastName }} {{ song.author.firstName }}</div>
            <div class="title">{{ song.title }}</div>
          </div>

          <b-card-text class="poem-body mt-3 pb-3">
            <div class="d-flex justify-content-center">
              <div v-html="currentContent"></div>
            </div>
          </b-card-text>
        </div>

        <div v-if="!hideActions" class="mt-4">

<!--          <span-->
<!--            class="material-icons icon-button px-2"-->
<!--            style="width: 64px;"-->
<!--            @click="$router.push(`/admin/songs/${song._id}`)"-->
<!--          >-->
<!--            edit-->
<!--          </span>-->

          <div class="d-flex flex-row justify-content-center">
            <div :style="item_style('speaker', 56, 50)" class="icon-button mx-5" :class="{ active: playing }" @click="play"></div>
            <div :style="item_style('qr_code', 51, 50)" class="icon-button mx-5" @click="openQRModal"></div>
            <div :style="item_style('print', 51, 50)" class="icon-button mx-5" @click.stop.prevent="printAction"></div>
          </div>

          <audio :id="`audioPlayer-${song._id}`" ref="audioPlayer" preload @ended="playing = false">
            <source :src="`${apiUrl}/songs/play/${song.language}/${song._id}`" type="audio/mpeg">
            Your browser does not support the audio tag.
          </audio>
        </div>
      </b-card-body>
    </b-card>

    <ModalDialog
      ref="qrcode"
      size="md"
      dialog-class="default-modal"
      close-action="Hvala"
    >
      <template #body>
        <div class="modal-title text-center">
          <qrcode-vue
            :value="song.url || 'http://vrabecanarhist.eu/'"
            :size="400"
            level="M"
            :background="'#FEECCC'"
            :foreground="'#006867'"
          />

          <!--          <b-img src="/img/default/gears_bottom.svg" class="w-100 mt-4"></b-img>-->
        </div>
      </template>
    </ModalDialog>

    <LanguageSwitchModal v-if="showLangSwitch" @close="changeLang($event); showLangSwitch = false;"/>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import admin from "../mixins/admin";
import flags from "../mixins/flags";
import LanguageSwitchModal from "./LanguageSwitchModal.vue";
import ModalDialog from "./ModalDialog.vue";

export default {
  name: "SongCard",
  mixins: [admin, flags],
  components: {
    ModalDialog,
    LanguageSwitchModal,
    QrcodeVue,
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
      return this.$config.API_URL
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
    openQRModal() {
      this.$refs.qrcode.open()
    },
    item_style(icon, w, h) {
      return {'height' : `${h}px`, 'width' : `${w}px`, 'background-image': this.icon_url(icon)}
    },
    icon_url(icon) {
      return `url('/img/default/${icon}.png')`
    },
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
        await this.$store.dispatch('stats/saveAction', { action: 'listened', id: this.song._id })
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

<style lang="scss" scoped>
@import "scss/app";
@import "scss/custom";

.content-overflow {
  max-height: calc(100vh - 330px);
  overflow-y: auto;
  overflow-x: hidden;
}

.title {
  font-size: 42px;
  font-family: "Playfair Display", serif;
  font-weight: 700;
  margin: 0;
  color: map-get($default-colours, 'text') !important;
}

.author {
  font-size: 36px;
  font-family: "Playfair Display", serif;
  font-weight: 700;
  color: map-get($default-colours, 'text') !important;
}

.poem-body {
  font-size: 34px;
  font-family: CORMORANT-500, serif;
  height: 100%;
  color: map-get($default-colours, 'text') !important;
}

.active {
  color: map-get($default-colours, 'accent');
}
</style>
