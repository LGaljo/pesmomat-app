<template>
  <b-container>
    <b-row>
      <b-col offset="1" cols="10">
        <div class="headline text-center">
          {{ $t('popular.title') }}
        </div>
        <div class="poem-body p-4">
          <div v-for="item of data.stats" :key="item.poem._id" class="mb-3">
            <nuxt-link :to="localePath(`/song/${item.poem._id}`)">
              <div class="author">{{item.author.firstName}} {{item.author.lastName}}</div>
              <b>{{ item.poem.title }}</b>
            </nuxt-link>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import {mapState} from "vuex";

export default {
  name: 'popular',
  components: {},
  async mounted() {
    await this.$store.dispatch('stats/fetch', { action: 'VIEW_POEM' })
  },
  computed: {
    ...mapState({ data: 'stats' })
  },
  methods: {
  },
}

</script>


<style scoped lang="scss">
@import "scss/custom";

.poem-body {
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 24px;
  font-family: CORMORANT-500, serif;
  color: map-get($default-colours, 'text') !important;
  background-color: map-get($default-colours, 'background') !important;
  border-radius: 10px;
}

.author {
  font-size: 22px;
  line-height: 20px;
}
</style>
