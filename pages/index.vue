<template>
  <div class="w-100">
    <div
      v-for="(song, i) of songs"
      :key="song.title + i"
    >
      <div
        class="offset-md-0 col-md-12 offset-lg-3 col-lg-6 py-3"
      >
        <SongCard
          :song="song"
        />
      </div>
    </div>
    <div>
    </div>

  </div>
</template>

<script>
import navbar from '../components/navbar.vue'
import SongCard from '../components/SongCard.vue'

export default {
  components: {navbar, SongCard},
  data() {
    return {
      songs: [
        {
          _id: 'Thats ID',
          url: 'https://google.com',
          title: "Štiri pesmi",
          author: "Tara Ferbežar Felgner",
          content: "kaj je to<br>" +
            "kar se je<br>" +
            "naselilo<br>" +
            "v moje telo<br>" +
            "kaj živi<br>" +
            "v mojem telesu<br>" +
            "kaj živi<br>" +
            "se zgošča<br>" +
            "vznika"
        },
        {
          _id: 'Thats ID',
          url: 'https://google.com',
          title: "Tri pesmi",
          author: "Maja Miloševič Čustić",
          content: "Oče je palični mešalnik.<br>" +
            "Šit, spet so se naredile grudice,<br>" +
            "nisem bila pozorna.<br>" +
            "Velike so, mastne in debele.<br>" +
            "Moj jezik je govorica grudic."
        },
        {
          _id: 'Thats ID',
          url: 'https://google.com',
          title: "Štiri pesmi",
          author: "Katarina Juvančič",
          content: "Izrezati žensko.<br>" +
            "Žensko izrezati skozi popek<br>" +
            "z laparoskopskimi falusi,<br>" +
            "s katerimi po trebuhu,<br>" +
            "napihnjenem kot pri utopljencu<br>" +
            "ali afriškem kvašiorkorju,<br>" +
            "brodita kirurga."
        }
      ]
    }
  },
  methods: {
    async scrapeWebsite() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
