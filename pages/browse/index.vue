<template>
  <b-container>
    <b-row>
      <b-col offset-md="3" md="6" cols="12" class="my-3">

        <!-- Periods list -->
        <div v-if="!chosen.period">
          <h1>Obdobja</h1>

          <div v-for="letter of alphabet" v-if="getPeriodsForLetter(letter).length" class="mb-3">
            <span class="text-uppercase letter">{{ letter }}</span>
            <div v-for="period of getPeriodsForLetter(letter)" class="author">
              <div @click="chosen.period = period" class="hover-underline">{{ period.name }}</div>
            </div>
          </div>
        </div>

        <!-- Authors of some period -->
        <div v-else-if="chosen.period && authors" class="mt-3">
          <h1>Pesniki obdobja {{ chosen.period.name }}</h1>

          <div v-for="letter of alphabet" v-if="getAuthorsForLetter(letter).length" class="mb-3">
            <span class="text-uppercase letter">{{ letter }}</span>
            <div v-for="author of getAuthorsForLetter(letter)" v-if="author" class="author">
              <div @click="openAuthor" class="hover-underline"><b>{{ author.lastName }}</b> {{ author.firstName }}</div>
            </div>
          </div>
        </div>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "browse",
  data() {
    return {
      chosen: {
        period: null,
        author: null,
      },
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
    await this.$store.dispatch('authors/fetch')
    await this.$store.dispatch('categories/fetch')
  },
  computed: {
    ...mapGetters({
      authors: 'authors/get',
      periods: "categories/get"
    })
  },
  methods: {
    getAuthorsForLetter(letter) {
      if (this.authors) {
        return this.authors?.filter(a => a.lastName.toLowerCase().startsWith(letter));
      }
    },
    setPeriod(period) {
      this.chosen.period = period
    },
    getPeriodsForLetter(letter) {
      if (this.periods) {
        return this.periods?.filter(a => a.name.toLowerCase().startsWith(letter));
      }
    },
    async openAuthor(author) {
      this.chosen.author = author
      await this.$router.push(`/browse/author/${author._id}`)
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
}
</style>
