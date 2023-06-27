<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light custom-nav">
      <b-container fluid>
        <nuxt-link class="navbar-brand" href="/" :to="localePath(`/`)">
          <div class="logo"></div>
        </nuxt-link>

        <div class="mx-5 coin-amount d-flex flex-row align-items-center mx-auto">
          <div :style="item_style('coins', 37, 50)" class="icon"></div>
          <div class="mx-3">{{ coins.amount }}</div>
        </div>

        <div class="ml-auto d-flex flex-row justify-content-around">
          <nuxt-link :to="localePath(`/browse`)" class="mx-4 icon-button">
            <div :style="item_style('search', 48, 50)"></div>
          </nuxt-link>

          <nuxt-link v-if="$config.ENABLE_GENERATE" :to="localePath(`/generate`)" class="mx-4 icon-button">
            <div :style="item_style('generate', 50,50)"></div>
          </nuxt-link>

          <nuxt-link :to="localePath(`/suggest`)" class="mx-4 icon-button">
            <div :style="item_style('hand', 43, 50)"></div>
          </nuxt-link>

          <nuxt-link :to="localePath(`/about`)" class="mx-4 icon-button">
            <div :style="item_style('questionmark', 36, 50)"></div>
          </nuxt-link>

          <div class="mx-4 icon-button">
            <div :style="item_style('language', 50, 50)" @click="showLanguageDropdown = !showLanguageDropdown"></div>
          </div>
        </div>
      </b-container>

      <LanguageDropdown v-if="showLanguageDropdown" @close="showLanguageDropdown = false" />
    </nav>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import admin from "../mixins/admin";
import flags from "../mixins/flags";
import LanguageDropdown from "./LanguageDropdown.vue";

export default {
  mixins: [ admin, flags ],
  data() {
    return {
      amount: 1,
      interval: null,
      showLanguageDropdown: false,
    }
  },
  components: {
    LanguageDropdown
  },
  props: {
      pagetype: {
        type: String,
        default: 'default'
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
    console.log(JSON.stringify(this.$config))
    await this.$store.dispatch('user/fetchUser');
    await this.$store.dispatch('coins/set')
    this.interval = setInterval(async () => {
      await this.$store.dispatch('coins/set')
    }, Number(this.$config.COIN_INTERVAL))
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    item_style(icon, w, h) {
      return {'height' : `${h}px`, 'width' : `${w}px`, 'background-image': this.icon_url(icon), 'background-size': 'contain'}
    },
    icon_url(icon) {
      return `url('/img/${this.pagetype}/${icon}.svg')`
    },
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
  font-weight: 700;
  font-size: 40px !important;
  font-family: MAGIONA_DISPLAY,serif;
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
