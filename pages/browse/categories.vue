<template>
  <b-container>
    <b-row>
      <b-col offset-md="3" md="6" cols="12" class="my-3">
        <h1 class="text-center">Obdobja</h1>

        <div style="height: 100px"></div>

        <div v-for="letter of alphabet" v-if="getPeriodsForLetter(letter).length" class="mb-3 offset-2">
          <span class="text-uppercase letter">{{ letter }}</span>
          <div v-for="period of getPeriodsForLetter(letter)" class="author">
            <div @click="openPeriod(period)" class="py-2 hover-underline">{{ period.name }}</div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "browse_categories",
  layout: 'timeout',
  data() {
    return {
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
    await this.$store.dispatch('categories/fetch', this.$route?.query?.lang)
  },
  computed: {
    ...mapGetters({
      periods: "categories/get"
    })
  },
  methods: {
    async openPeriod(period) {
      await this.$router.push({
        path: `/browse/authors`,
        query: { period: period._id }
      })
    },
    getPeriodsForLetter(letter) {
      if (this.periods) {
        return this.periods?.filter(a => a.name.toLowerCase().startsWith(letter));
      }
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
</style>
