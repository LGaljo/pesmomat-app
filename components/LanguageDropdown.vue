<template>
  <div
    class="pop"
    v-click-outside="onClickOutside"
  >
    <div
      v-for="locale of availableLocales"
      :key="locale"
      class="language-item m-2 p-2 pr-3 text-right rounded"
      :class="{ 'activebox': currentLocale === locale }"
      @click="setLanguage(locale)"
    >{{ $t('languages.' + locale) }}</div>
  </div>
</template>

<script>

export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    currentLocale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    async setLanguage(locale) {
      await this.$router.replace(this.switchLocalePath(locale))
      this.$emit('close')
    },
    onClickOutside() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "scss/app";
@import "scss/custom";

</style>
