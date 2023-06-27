<template>
  <div>
    <div
      style="height: calc(100vh - 120px); max-height: calc(100vh - 120px);"
      class="d-flex flex-row align-items-center justify-content-center"
      @click="openSongRequest"
    >
      <transition name="fade">
        <song-card
          v-if="show && songs && song"
          :song="song"
          :hide-actions="true"
          :limit="20"
          class="no-border"
        />
      </transition>
    </div>

<!--    <b-modal v-model="showModal" hide-footer :title="$t('modals.insufficient.title')">-->
<!--      <p>{{ $t('modals.insufficient.body')}}</p>-->
<!--      <b-button class="mt-2" variant="warning" block @click="showModal = false">{{ $t('actions.understand') }}</b-button>-->
<!--    </b-modal>-->
<!--    <b-modal v-model="showModalUse" hide-footer :title="$t('modals.purchase.title')">-->
<!--      <p>{{ $t('modals.purchase.body')}}</p>-->
<!--      <div class="mt-2 d-flex justify-content-between">-->
<!--        <b-button class="mr-2" variant="warning" block @click="showModalUse = false">{{ $t('actions.cancel') }}</b-button>-->
<!--        <b-button class="ml-2 mt-0" variant="primary" block @click="openSong">{{ $t('actions.understand') }}</b-button>-->
<!--      </div>-->
<!--    </b-modal>-->

    <ModalDialog
      ref="fundsdialog"
      size="lg"
      dialog-class="default-modal"
      :action="$t('actions.ok')"
      persistent
      pagetype="default"
    >
      <template #body>
        <div class="modal-title text-center">
          {{ $t('modals.insufficient.title') }}
        </div>
      </template>
    </ModalDialog>

    <ModalDialog
      ref="buydialog"
      size="lg"
      dialog-class="default-modal"
      @first="subtractAndOpen"
      :action="$t('actions.understand')"
      pagetype="default"
    >
      <template #body>
        <div class="modal-title text-center">
          {{ $t('modals.purchase.body') }}
        </div>
      </template>
    </ModalDialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SongCard from "../components/SongCard";
import ModalDialog from "../components/ModalDialog.vue";

export default {
  name: 'index',
  layout: 'minimal',
  components: {ModalDialog, SongCard },
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
  async mounted() {
    await this.$store.dispatch('user/fetchUser');
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
    }, Number(this.$config.SLIDESHOW_INTERVAL))
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      isApproved: 'user/isApproved',
      coins: 'coins/get',
    }),
    ...mapActions(['user/fetchUser']),
  },
  methods: {
    async getSongs() {
      await this.$axios.$get('/songs?favourite=true', { params: { limit: 200 }})
        .then(res => {
          if (res?.items?.length) {
            this.songs = res?.items;
          }
        })
        .catch(() => {
          this.$toast.error('Napaka pri pridobivanju pesmi', {duration: 10000});
        })
    },
    async subtractAndOpen() {
      if (this.coins < 1) {
        // Request a coin to be inserted
        this.$refs.fundsdialog.open()
      } else {
        await this.openSong()
      }
    },
    async openSongRequest() {
      this.songId = this.song?._id
      if (this.coins > 0) {
        this.$refs.buydialog.open()
      } else {
        this.$refs.fundsdialog.open()
      }
    },
    async openSong() {
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
