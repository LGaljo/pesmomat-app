<template>
  <b-container>
    <b-row>
      <b-col offset-md="2" md="8" cols="12" class="my-3 overflow-auto">
        <h1>Pesmi</h1>

        <b-pagination
          v-if="total > 0"
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="table"
          @change="paginationChange"
          :key="counter"
          class="justify-content-center"
        />

        <!-- TABLE -->
        <table
          id="table"
          class="mt-3 table table-hover"
        >
          <thead>
            <tr>
              <th scope="col">Naslov</th>
              <th scope="col">Avtor</th>
              <th scope="col" class="text-right">Dejanja</th>
            </tr>
          </thead>

          <tbody :key="counter">
            <tr v-for="song of songs" :key="song._id" class="fake-button">
              <td @click="openSong(song)">
                <nuxt-link :to="localePath(`/admin/songs/${song._id}`)">
                  {{ song.title }}
                </nuxt-link>
              </td>
              <td @click="openSong(song)" v-if="song.author" class="text-muted">
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
          </tbody>
        </table>

        <b-pagination
          v-if="total > 0"
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="table"
          @change="paginationChange"
          :key="counter"
          class="justify-content-center"
        />

        <div v-if="!songs.length" class="text-center my-4">Ni pesmi</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      currentPage: null,
      total: 0,
      perPage: 25,
      songs: [],
      counter: 0,
    }
  },
  async mounted() {
    this.currentPage = Number(this.$route.query.page) || 1;
    console.log(this.currentPage, Number(this.$route.query.page) || 1)
    await this.getSongs();
    this.counter++;
    this.$nextTick(() => {
      this.currentPage = Number(this.$route.query.page) || 1;
    })
  },
  methods: {
    async remove(song) {
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
    async paginationChange(event) {
      this.currentPage = event
      await this.getSongs();
      history.replaceState({}, '', this.$route.path + `?page=${this.currentPage}`)
      this.counter++;
    },
    async getSongs() {
      this.$axios.$get('/songs', {
        params: {
          page: this.currentPage,
          limit: this.perPage
        }
      })
        .then(res => {
          if (!!res?.items) {
            this.songs = res?.items;
            this.total = res?.total;
          }
        })
        .catch(() => {
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
