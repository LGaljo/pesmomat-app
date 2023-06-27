export default {
  computed: {
    isAdmin() {
      return this.$config.ADMIN;
    },
    env() {
      return this.$config.ENV;
    },
  }
}
