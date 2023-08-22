<template>
  <b-container>
    <b-row>
      <b-col>
        <h3>Pesmi z največ ogledi</h3>
        <div v-for="item of data.stats" :key="item.poem._id" class="poem-body">
          <b>{{ item.poem.title }} ({{item.author.firstName}} {{item.author.lastName}})</b>
          <div>Ogledov: {{ item.views }}</div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'stats',
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

</style>
