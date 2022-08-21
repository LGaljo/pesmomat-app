export default {
  data() {
    return {
      timeout: null,
      length: process.env.BROWSE_TIMEOUT || 10000
    }
  },
  created() {
    console.log('timeout created')
    this.onReroute();
  },
  methods: {
    onReroute() {
      console.log('set timeout')
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        console.log('reroute to beginning')
        await this.$router.push('/frontpage')
      }, this.length);
    }
  }
}
