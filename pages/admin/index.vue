<template>
<b-container>
  <b-row>
    <b-col>
      <div class="headline">Nadzorna plošča</div>
      <div class="link-item my-2">
        <nuxt-link :to="localePath('/admin/songs')">Urejaj pesmi</nuxt-link>
      </div>
      <div class="link-item my-2">
        <nuxt-link :to="localePath('/admin/authors')">Urejaj avtorje</nuxt-link>
      </div>
      <div class="link-item my-2">
        <nuxt-link :to="localePath('/admin/categories')">Urejaj zvrsti</nuxt-link>
      </div>

      <div class="link-item mt-5">
        <b-btn @click="logout">Odjava</b-btn>
      </div>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'minimal',
  components: {},
  computed: {},
  methods: {
    async logout() {
      console.log('logout')
      localStorage.removeItem('jwt');
      localStorage.removeItem('userId');
      await this.$store.dispatch('user/unsetUser');
      await this.$router.replace(this.localePath('/'))
    }
  },
}
</script>

<style scoped lang="scss">
@import "scss/custom";

.link-item {
  font-size: 24px;
  background-color: map-get($default-colours, 'background');
  border-radius: 20px;
}
</style>
