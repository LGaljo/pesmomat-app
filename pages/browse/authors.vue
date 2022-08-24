<template>
  <b-container>
    <b-row>
      <b-col offset-md="2" md="8" cols="12" class="my-3">
        <div v-if="period && $route.query.period">
          <h1 class="text-center">Pesniki obdobja {{ period.name }}</h1>

          <div style="height: 100px"></div>

          <template v-if="authors.length">
            <div v-for="letter of alphabet" v-if="getAuthorsForLetter(letter).length" class="mb-3 offset-2">
              <div class="text-uppercase letter py-2">{{ letter }}</div>
              <div v-for="author of getAuthorsForLetter(letter)" v-if="author" class="author">
                <div @click="openAuthor(author)" class="py-2 hover-underline"><b>{{ author.lastName }}</b> {{ author.firstName }}</div>
              </div>
            </div>
          </template>
          <div v-else>Ni avtorjev za prikaz</div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "browse_authors",
  data() {
    return {
      period: null,
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
    await this.$store.dispatch('authors/fetch', {
        period: this.$route.query.period
    })
    this.period = await this.$axios.$get(`/categories/${this.$route.query.period}`)
  },
  computed: {
    ...mapGetters({
      authors: 'authors/get',
    })
  },
  methods: {
    getAuthorsForLetter(letter) {
      if (this.authors) {
        return this.authors?.filter(a => a.lastName.toLowerCase().startsWith(letter));
      }
    },
    async openAuthor(author) {
      await this.$router.push({
        path: `/browse/songs`,
        query: {
          author: author._id,
          period: this.period._id
        }
      })
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
