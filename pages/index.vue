<template>
  <div class="w-100">
        <div
          v-for="(song, i) of songs"
          class="offset-md-0 col-md-12 offset-lg-3 col-lg-6 py-3"
          :key="song.title + i"
        >
          <SongCard
            :content="song.content"
            :title="song.title"
            :author="song.author"
          />
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
          title: "Tri pesmi",
          author: "Maja Miloševič Čustić",
          content: "Oče je palični mešalnik.<br>" +
            "Šit, spet so se naredile grudice,<br>" +
            "nisem bila pozorna.<br>" +
            "Velike so, mastne in debele.<br>" +
            "Moj jezik je govorica grudic."
        },
        {
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
