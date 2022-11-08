<template>
  <b-container>
    <b-row>
      <b-col offset-md="2" md="8" cols="12" class="my-3">
        <h1>Pesmi</h1>

        <!-- TABLE -->
        <table class="mt-3 table table-hover">
          <thead>
          <tr>
            <th scope="col">Naslov</th>
            <th scope="col">Avtor</th>
            <th scope="col" class="text-right">Dejanja</th>
          </tr>
          </thead>

          <tr v-for="song of songs" class="fake-button">
            <td @click="openSong(song)">
              <nuxt-link :to="localePath(`/admin/songs/${song._id}`)">
                {{ song.title }}
              </nuxt-link>
            </td>
            <td @click="openSong(song)" class="text-muted">
              {{ song.author.lastName }} {{ song.author.firstName }}
            </td>
            <td class="text-right">
              <b @click="remove(song)" class="text-danger cursor-pointer mr-2">Izbriši</b>
              <span
                @click="setFavourite(song)"
                :class="['material-icons', { 'favourite': song.favourite }]"
              >
              star
            </span>
            </td>
          </tr>
        </table>
        <div v-if="!songs.length" class="text-center my-4">Ni avtorjev</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      songs: [],
    }
  },
  async created() {
    await this.getSongs();
  },
  methods: {
    async remove(song) {
      console.log('Remove song ' + song.title)
      await this.$axios.$delete(`/songs/${song._id}`)
      await this.getSongs();
    },
    async setFavourite(song) {
      await this.$axios.$post(`/songs/favourite/${song._id}`)
      await this.getSongs();
    },
    async openSong(song) {
      await this.$router.push(this.localePath(`/admin/songs/${song._id}`))
    },
    async getSongs() {
      this.$axios.$get('/songs')
        .then(res => {
          if (res.length) {
            this.songs = res;
          }
        })
        .catch(res => {
          this.$toast.error('Napaka pri pridobivanju pesmi', {duration: 10000});
        })
    }
  },
}
</script>

<style scoped>
.favourite {
  color: gold;
}
</style>
