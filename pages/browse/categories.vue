<template>
  <b-container>
    <b-row>
      <b-col cols="10">
        <div class="headline text-center">{{ $t('periods.title') }}</div>

          <div
            v-for="period of periods"
            class="author mb-3"
            :key="period"
            :id="period[0]"
          >
            <div @click="openPeriod(period)" class="list-item hover-underline">{{ period.name }}</div>
          </div>
      </b-col>
    </b-row>
    <div class="letter-box">
      <div
        v-if="periods.length > 8"
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
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import alphabet from "../../mixins/alphabet";

export default {
  name: "browse_categories",
  layout: 'timeout',
  mixins: [alphabet],
  data: () => ({
  }),
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
      await this.$store.dispatch('stats/saveAction', { action: 'category_view', id: period._id })
      await this.$router.push({
        path: this.localePath(`/browse/authors`),
        query: { period: period._id }
      })
    },
    scrollDown(letter) {
      console.log(letter)
      this.$router.push({ path: this.$route.path , query: this.$route.query, hash: letter.toUpperCase()})
    }
  }
}
</script>

<style scoped lang="scss">
@import "scss/custom";

.author {
  font-size: 1rem;
}

.hover-underline:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
