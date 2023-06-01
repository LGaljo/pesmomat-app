<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light custom-nav">
      <div class="container-fluid">

        <nuxt-link class="navbar-brand" href="/" :to="localePath(`/`)">{{ $t('title') }}</nuxt-link>
        <nuxt-link class="nav-item nav-link link" :class="{ 'mr-auto': !isAdmin }" :to="localePath(`/browse/categories`)">{{ $t('actions.search') }}</nuxt-link>

        <div v-if="isAdmin && user && isApproved" class="no-link mr-auto">
          <b-nav-item-dropdown class="nav-item nav-link p-0" text="Admin">
            <nuxt-link class="nav-item nav-link link2" :to="localePath(`/admin/songs/add`)">{{ $t('navbar.admin.add') }}</nuxt-link>
            <nuxt-link class="nav-item nav-link link2" :to="localePath(`/admin/songs`)">{{ $t('navbar.admin.songs') }}</nuxt-link>
            <nuxt-link class="nav-item nav-link link2" :to="localePath(`/admin/authors`)">{{ $t('navbar.admin.authors') }}</nuxt-link>
            <nuxt-link class="nav-item nav-link link2" :to="localePath(`/admin/categories`)">{{ $t('navbar.admin.categories') }}</nuxt-link>
            <nuxt-link class="nav-item nav-link link2" @click="logout" :to="localePath(`/`)">{{ $t('navbar.admin.logout') }}</nuxt-link>
          </b-nav-item-dropdown>
        </div>
        <div v-else class="mr-auto"></div>

        <div>
          <b-dropdown size="lg" variant="button" toggle-class="btn-secondary pb-0 pt-1 px-1" no-caret>
            <template #button-content>
              <span class="material-icons icon-button px-2 text-center align-self-center" style="width: 40px">translate_variant</span>
            </template>
            <b-dropdown-item
              class=""
              v-for="locale in availableLocales"
              :key="locale"
              :to="switchLocalePath(locale)">
              <img height="50" :src="flags[locale]" alt="flag">
              {{ $t('languages.' + locale) }}
            </b-dropdown-item>
          </b-dropdown>
        </div>

<!--        <nuxt-link-->
<!--          class="mx-2 py-0 my-0"-->
<!--          v-for="locale in availableLocales"-->
<!--          :key="locale"-->
<!--          :to="switchLocalePath(locale)">-->
<!--        </nuxt-link>-->

        <div class="ml-4 coin-amount">
          {{ coins.amount }} <i class="material-icons coin-amount-icon">article</i>
        </div>
      </div>
    </nav>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import admin from "../mixins/admin";
import flags from "../mixins/flags";

export default {
  mixins: [ admin, flags ],
  data() {
    return {
      amount: 1,
      interval: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      isApproved: 'user/isApproved',
    }),
    ...mapActions(['user/logoutUser', 'user/fetchUser']),
    ...mapState(['coins']),
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  async created() {
    await this.$store.dispatch('user/fetchUser');
    await this.$store.dispatch('coins/set')
    this.interval = setInterval(async () => {
      await this.$store.dispatch('coins/set')
    }, Number(process.env.COIN_INTERVAL))
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logoutUser');
      // this.$router.replace('/')
    }
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
