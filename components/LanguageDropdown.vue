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

.pop {
  position: absolute;
  right: 48px;
  top: 90px;
  width: 250px;
  height: auto;

  .language-item {
    background-color: map-get($default-colours, 'background');
    font-size: 32px;
  }

  .language-item:hover {
    cursor: pointer;
    background-color: map-get($default-colours, 'accent');
    color: map-get($default-colours, 'background') !important;
  }
}

.activebox {
  background-color: map-get($default-colours, 'accent') !important;
  color: map-get($default-colours, 'background') !important;
}

</style>
