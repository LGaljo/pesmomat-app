<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <nuxt-link class="navbar-brand" href="/" :to="`/?apiUrl=${$route.query.apiUrl}`">Pesmomat</nuxt-link>
        <nuxt-link class="nav-item nav-link link" :to="`/add?apiUrl=${$route.query.apiUrl}`">Dodaj pesem</nuxt-link>
        <div class="coin-amount">
          {{ coins.amount }} <i class="material-icons coin-amount-icon">article</i>
        </div>
      </div>
    </nav>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      amount: 1
    }
  },
  computed: mapState([
    'coins'
  ]),
  async created() {
    await this.$store.dispatch('coins/set')
    setInterval(async () => {
      await this.$store.dispatch('coins/set')
    }, 10000)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.coin-amount-icon {
  vertical-align: bottom;
  font-size: 28px !important;
  color: goldenrod;
}
.coin-amount {
  font-weight: 600;
  font-size: 18px !important;
}
.link {
  color: #c7c7c7;
  margin-right: auto;
  margin-left: 12px;
}
.link:hover {
  color: #808080;
}
</style>
