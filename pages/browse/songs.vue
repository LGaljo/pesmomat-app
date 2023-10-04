<template>
  <b-container>
    <b-row>
      <b-col cols="10" offset="1">
        <div v-if="songs && songs.length">

          <div v-if="$route.query.search" class="headline text-center">
            {{ $t('songs.title', [author.lastName, author.firstName]) }}
          </div>
          <div v-if="$route.query.search" class="headline text-center">
            {{ $t('songs.search_title') }}
          </div>

          <div
            v-for="song of songs"
            v-if="songs"
            :key="song._id"
            :id="song.title[0]"
            class="author mb-3"
          >
            <div
              @click="openSongRequest(song)"
              class="list-item hover-underline p-3"
            >
              <div v-if="$route.query.search" class="author">{{song.author.firstName}} {{song.author.lastName}}</div>
              <div>{{ song.title }}</div>
            </div>
          </div>
        </div>

        <div v-else class="text-center">
          <div v-if="$route.query.search" class="no_results">
            <div>{{ $t('songs.search_none') }}</div>
            <DefaultButton class="mt-4" :action="'Pojdi nazaj'" @click="$router.back()" />
          </div>
          <div v-else class="list-item">
            <div>{{ $t('songs.none') }}</div>
            <DefaultButton class="mt-4" :action="'Pojdi nazaj'" @click="$router.back()" />
          </div>
        </div>
      </b-col>
    </b-row>

    <div class="letter-box">
      <div
        v-if="songs.length > 8"
        class="d-flex flex-column align-items-end"
      >
        <div
          v-for="letter of alphabet"
          class="letter d-flex justify-content-center align-items-center cursor-pointer"
          @click="scrollDown(letter)"
        >
          {{ letter }}
        </div>
      </div>
    </div>

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
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";
import alphabet from "../../mixins/alphabet";
import ModalDialog from "../../components/ModalDialog.vue";
import DefaultButton from "../../components/DefaultButton.vue";

export default {
  name: "browse_songs",
  components: {DefaultButton, ModalDialog},
  layout: 'timeout',
  mixins: [alphabet],
  data() {
    return {
      author: null,
      songId: null,
    }
  },
  async mounted() {
    if (this.$route.query.author) {
      this.author = await this.$axios.$get(`/author/${this.$route?.query?.author}`)
    }

    await this.$store.dispatch('songs/fetch', {
      author: this.$route?.query?.author,
      period: this.$route?.query?.period,
      search: this.$route?.query?.search
    })
  },
  computed: {
    ...mapGetters({
      coins: 'coins/get',
      songs: 'songs/get',
    })
  },
  methods: {
    async subtractAndOpen() {
      if (this.coins < 1) {
        // Request a coin to be inserted
        this.$refs.fundsdialog.open()
      } else {
        await this.openSong()
      }
    },
    async openSongRequest(song) {
      this.songId = song?._id
      if (this.coins > 0) {
        this.$refs.buydialog.open()
      } else {
        this.$refs.fundsdialog.open()
      }
    },
    async openSong() {
      await this.$store.dispatch('coins/reduce')
      await this.$store.dispatch('stats/saveAction', { action: 'poem_view', id: this.songId })
      await this.$router.push(this.localePath(`/song/${this.songId}`))
    },
    scrollDown(letter) {
      this.$router.push({ path: this.$route.path , query: this.$route.query, hash: letter.toUpperCase()})
    },
  }
}
</script>

<style scoped>
.letter {
  font-size: 1.4rem;
  font-weight: 500;
}

.author {
  font-size: 1rem;
}

.hover-underline:hover {
  text-decoration: underline;
  cursor: pointer;
}

.no_results {
  border-radius: 20px;
  background: #FEECCC;
  color: #006867;
  font-size: 32px;
  font-family: MAGIONA_DISPLAY, serif !important;
  padding: 20px;
  font-weight: 600;
  line-height: 1;
}

.author {
  text-transform: none;
  font-size: 22px;
  line-height: 36px;
  font-weight: 500;
  font-family: Playfair Display, serif !important;
}
</style>
