<template>
  <b-container>
    <b-row>
      <b-col cols="10">
        <div v-if="period && $route.query.period">
          <div class="headline text-center">{{ period.name }}</div>

          <div
            v-for="author of authors"
            v-if="authors"
            :key="author._id"
            :id="author.lastName[0]"
            class="author mb-3">
            <div
              @click="openAuthor(author)"
              class="list-item hover-underline"
              :id="author.lastName[0]"
            >
              {{ author.lastName }} {{ author.firstName }}
            </div>
          </div>
          <div v-else>{{ $t('authors.none') }}</div>
        </div>
      </b-col>
    </b-row>
    <div class="letter-box">
      <div
        v-if="authors.length > 8"
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
import {mapGetters} from "vuex";
import alphabet from "../../mixins/alphabet";

export default {
  name: "browse_authors",
  layout: 'timeout',
  mixins: [alphabet],
  data() {
    return {
      period: null,
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
    async openAuthor(author) {
      await this.$store.dispatch('stats/saveAction', { action: 'author_view', id: author._id })
      await this.$router.push({
        path: this.localePath(`/browse/songs`),
        query: {
          author: author._id,
          period: this.period._id
        }
      })
    },
    scrollDown(letter) {
      this.$router.push({ path: this.$route.path , query: this.$route.query, hash: letter.toUpperCase()})
    }
  }
}
</script>

<style scoped>
.hover-underline:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
