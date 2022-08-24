export default {
  computed: {
    isAdmin() {
      return process.env.ADMIN;
    },
    env() {
      return process.env.NODE_ENV;
    },
  }
}
