<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/" @click="$router.push('/')">Pesmomat</a>
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
</style>
