<template>
  <b-container>
    <b-row>
      <b-col offset-md="3" md="6" cols="12" class="my-3">
        <div v-if="author && $route.query.author">
          <h1 class="text-center">Pesmi {{ author.lastName }} {{ author.firstName }}</h1>

          <div style="height: 100px"></div>

          <div v-for="letter of alphabet" v-if="getSongsForLetter(letter).length" class="mb-3 offset-2">
            <div class="text-uppercase letter py-2">{{ letter }}</div>
            <div v-for="song of getSongsForLetter(letter)" v-if="author" class="author">
              <div @click="openSong(song)" class="py-2 hover-underline">{{ song.title }}</div>
            </div>
          </div>
        </div>
        <div v-else>Ni podatkov za prikaz</div>
      </b-col>
    </b-row>
    <b-modal v-model="showModal" hide-footer title="Nezadostno število žetonov">
      <p>Za ogled, predvajanje in tiskanje pesmi je potrebno vstaviti kovanec.</p>
      <b-button class="mt-2" variant="warning" block @click="showModal = false">Razumem</b-button>
    </b-modal>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "browse_songs",
  layout: 'timeout',
  data() {
    return {
      author: null,
      songs: [],
      showModal: false,
      alphabet: [
        'a',
        'b',
        'c',
        'č',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'r',
        's',
        'š',
        't',
        'u',
        'v',
        'z',
        'ž'
      ],
    }
  },
  async mounted() {
    this.author = await this.$axios.$get(`/author/${this.$route?.query?.author}`)
    this.songs = await this.$axios.$get(`/songs`, {
      params: {
        author: this.$route?.query?.author,
        period: this.$route?.query?.period
      }
    })
  },
  computed: {
    ...mapGetters({
      coins: 'coins/get',
    })
  },
  methods: {
    getSongsForLetter(letter) {
      if (this.songs) {
        return this.songs?.filter(a => a.title.toLowerCase().startsWith(letter));
      }
    },
    async openSong(song) {
      if (this.coins > 0) {
        await this.$store.dispatch('coins/reduce');
        await this.$router.push(`/song/${song?._id}`)
      } else {
        this.showModal = true;
      }
    }
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
</style>
