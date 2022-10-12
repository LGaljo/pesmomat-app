export default {
  data() {
    return {
      timeout: null,
      length: process.env.BROWSE_TIMEOUT || 10000
    }
  },
  created() {
    this.onReroute();
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: {
    onReroute() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        await this.$router.push(this.localePath('/'))
      }, this.length);
    }
  }
}
