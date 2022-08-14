<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">

        <nuxt-link class="navbar-brand" href="/" :to="`/`">Pesmomat</nuxt-link>
        <nuxt-link class="nav-item nav-link link" :to="`/browse/categories`">Išči</nuxt-link>

        <div class="no-link mr-auto">
          <b-nav-item-dropdown class="nav-item nav-link p-0" text="Admin">
            <nuxt-link class="nav-item nav-link link2" :to="`/admin/songs/add`">Dodaj pesem</nuxt-link>
            <nuxt-link class="nav-item nav-link link2" :to="`/admin/songs`">Pesmi</nuxt-link>
            <nuxt-link class="nav-item nav-link link2" :to="`/admin/authors`">Avtorji</nuxt-link>
            <nuxt-link class="nav-item nav-link link2" :to="`/admin/categories`">Obdobja</nuxt-link>
          </b-nav-item-dropdown>
        </div>

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
  color: #808080 !important;
  margin-left: 12px;
}
.link:hover {
  color: #5c5c5c;
}
.link2 {
  color: #212529;
}
.link2:hover {
  color: #c7c7c7;
}


</style>
