<template>
  <b-container style="height: 100vh">
    <b-row>
      <b-col cols="12">
        <div
          class="h-100 d-flex flex-column justify-content-center"
          @click="detectHand"
        >
          <div class="text-center">
            <div class="line" v-if="scanning">
              <b-img src="/img/generate/scan.svg"></b-img>
            </div>
            <b-img src="/img/generate/hand_big.svg" class="hand"></b-img>
          </div>

          <div class="d-flex flex-column justify-content-center align-items-center action-background">
            <div id="suggest-text" class="text-center font-weight-bold">{{ $t('suggest.title') }}</div>
            <b-img src="/img/generate/gears_bottom.svg" class="w-100 mt-4"></b-img>
          </div>
        </div>
      </b-col>
    </b-row>

    <ModalDialog
      ref="fundsdialog"
      size="lg"
      dialog-class="generate-modal"
      @cancel="redirectBack"
      :action="$t('actions.ok')"
      persistent
      pagetype="generate"
    >
      <template #body>
        <div class="modal-title text-center">
          {{ $t('modals.insufficient.title') }}
        </div>
      </template>
    </ModalDialog>

    <ModalDialog
      ref="buydialog"
      size="md"
      dialog-class="generate-modal"
      @first="suggestPoem"
      @cancel="redirectBack"
      :action="$t('actions.yes')"
      persistent
      pagetype="generate"
    >
      <template #body>
        <div class="modal-title text-center">
          {{ $t('suggest.buy') }}
        </div>
      </template>
    </ModalDialog>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";
import ModalDialog from "../components/ModalDialog.vue";

export default {
  name: 'index',
  layout: 'generate',
  components: {ModalDialog},
  data() {
    return {
      scanning: false,
    }
  },
  async mounted() {
    await this.$store.dispatch('songs/fetch')
    this.buyPoem()
  },
  computed: {
    ...mapGetters({
      songs: 'songs/get',
      coins: 'coins/get'
    }),
  },
  methods: {
    detectHand() {
      if (this.coins < 1) {
        this.$refs.fundsdialog.open()
        return
      }
      this.scanning = true;
      setTimeout(() => {
        const ranInt = Math.floor(Math.random() * this.songs.length)
        const song = this.songs[ranInt]
        this.scanning = false
        this.$router.push(`/song/${song?._id}`)
      }, Math.random() * 5000 + 2000)
    },
    buyPoem() {
      this.$refs.buydialog.open()
    },
    async suggestPoem() {
      if (this.coins < 1) {
        // Request a coin to be inserted
        this.$refs.fundsdialog.open()
      } else {
        // Subtract a coin
        await this.$store.dispatch('coins/reduce')
      }
    },
    redirectBack() {
      this.$router.replace('/')
    }
  },
}

</script>

<style lang="scss" scoped>
@import "scss/custom";

.card-custom {
  border: none !important;
  background: rgba(0, 0, 0, 0.25);
  overflow: auto !important;
  max-height: 30vh;
  height: 30vh;
}

.modal-title {
  font-size: 33px;
  color: #FFE5B8;
}

.hand {
  height: 60vh;
  max-height: 60vh;
}

.action-background {
  padding-top: 64px;
  margin-top: 150px;
  font-size: 28px;
  color: map-get($generate-colours, 'text');
  background: map-get($generate-colours, 'background');
}

.mt-300 {
  margin-top: 300px;
}

#suggest-text {
  color: #FFE5B8;
  text-align: center;
  font-size: 33px;
  font-family: ARVO-700, serif;
}

@keyframes animateLines {
  0%, 100%
  {
    top: 0;
  }
  50%
  {
    top: 65%;
  }
}

.line {
  position: absolute;
  top: 0;
  left: 0;
  filter: drop-shadow(0 0 20px map-get($generate-colours, 'accent'))
    drop-shadow(0 0 60px map-get($generate-colours, 'accent'));
  animation: animateLines 2s ease-in-out infinite;
}
</style>
