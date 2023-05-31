<template>
  <b-form class="w-100" ref="form" novalidate @submit.prevent="">
    <div class="form-group">
      <label for="title">Naslov pesmi</label>
      <input
        v-model="song.title"
        type="text"
        class="form-control"
        id="title"
        placeholder="Vnesi naslov"
      >
    </div>

    <div class="form-group">
      <label for="url">Povezava</label>
      <input
        v-model="song.url"
        type="text"
        class="form-control"
        id="url"
        aria-describedby="urlHelp"
        placeholder="Povezava do pesmi"
      >
      <small
        id="urlHelp"
        class="form-text text-muted"
      >
        Povezava do mesta, kjer se nahaja pesem.
      </small>
    </div>

    <!-- Avtor -->
    <div class="form-group">
      <label for="author">Avtor</label>
      <b-form-select v-model="song.authorId" class="form-control" id="author"
                     :options="options.authors"></b-form-select>
      <div class="invalid-feedback">
        Prosim vnesi avtorja.
      </div>
      <small
        id="urlHelp"
        class="form-text text-muted"
      >
        Avtor ne obstaja?
        <nuxt-link to="/admin/authors">Dodaj ga</nuxt-link>
        .
      </small>
    </div>

    <!-- Zvrst -->
    <div class="form-group">
      <label for="category">Zvrst</label>
      <b-form-select v-model="song.categoryId" class="form-control" id="category"
                     :options="options.categories"></b-form-select>
      <div class="invalid-feedback">
        Prosim vnesi Zvrst.
      </div>
      <small
        id="urlHelp"
        class="form-text text-muted"
      >
        Zvrst ne obstaja?
        <nuxt-link to="/admin/categories">Dodaj jo</nuxt-link>
        .
      </small>
    </div>

    <b-card
      v-if="song.contents.length"
      class="mt-3 mb-2"
    >
      <ul class="nav nav-tabs">
        <template v-for="lang in options.languages">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{'active': activeVersion === lang.value }"
              aria-current="page"
              @click="setActive(lang.value)"
            >
              {{ lang.text }}
              <template v-if="hasContent(lang.value) === 2">🟢</template>
              <template v-if="hasContent(lang.value) === 1">🟡</template>
            </a>
          </li>
        </template>
      </ul>

      <!-- Vsebina -->
      <div :key="counter" class="form-group mt-1">
        <textarea v-model="activeContent" class="form-control" id="content" rows="15" required @blur="updateField"/>
        <div class="invalid-feedback">
          Prosim vnesi besedilo pesmi.
        </div>
      </div>
    </b-card>

    <b-button
      v-if="id"
      type="submit"
      @click.prevet.stop="play"
      class="mt-2"
      :class="{ active: playing }"
    >
      Predvajaj pesem
    </b-button>

    <audio v-if="id" :id="`audioPlayer-${id}`" ref="audioPlayer" @ended="playing = false">
      <source :src="`${apiUrl}/songs/play/${id}`" type="audio/mpeg">
      Your browser does not support the audio tag.
    </audio>

    <div class="mt-2">
      <b-button
        v-if="!id"
        type="submit"
        @click.prevet.stop="onCreate"
      >
        <div class="d-flex align-items-center">
          <div>Dodaj pesem</div>
          <i class="ml-1 material-icons">save</i>
        </div>
      </b-button>
      <b-button
        v-else
        type="submit"
        @click.prevet.stop="onUpdate"
        class="btn-primary"
      >
        <div class="d-flex align-items-center">
          <div>Posodobi pesem</div>
          <i class="ml-1 material-icons">save</i>
        </div>
      </b-button>
    </div>
  </b-form>
</template>

<script>
import SongCard from "./SongCard";

export default {
  name: "AddEditSong",
  components: {SongCard},
  props: {
    id: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      counter: 0,
      song: {
        _id: null,
        title: null,
        author: null,
        authorId: null,
        categoryId: null,
        content: null,
        contents: [],
        language: null,
        url: null
      },
      activeVersion: 'sl',
      activeContent: '',
      playing: false,
      options: {
        authors: [
          {value: null, text: 'Prosim izberi avtorja'},
        ],
        categories: [
          {value: null, text: 'Prosim izberi zvrst'},
        ],
        languages: [
          {value: null, text: 'Prosim izberi jezik'},
        ],
      }
    }
  },
  computed: {
    apiUrl() {
      return process.env.API_URL
    },
  },
  async created() {
    const languages = await this.$axios.$get('/songs/languages');
    this.options.languages = Object.keys(languages).map(k => {
      return {
        value: languages[k].shortcode,
        text: languages[k].shortcode
      }
    })
    if (this.id) {
      this.song = await this.$axios.$get(`/songs/${this.id}`)
      this.song.contents = this.song?.contents.map(c => ({
        content: c?.content?.replaceAll('<br>', '\n'),
        lang: c?.lang,
      }));
      this.song.authorId = this.song?.author?._id || null
      this.song.categoryId = this.song?.category?._id || null
      // TODO: Not always SL
      // this.activeVersion = this.song.language
      this.activeContent = this.song.contents.find((c) => c.lang === this.activeVersion)?.content
    }
    this.options.authors.push(...(await this.$axios.$get('/author')).map(a => {
      return {
        value: a._id,
        text: `${a.lastName} ${a.firstName}`
      }
    }))
    this.options.categories.push(...(await this.$axios.$get('/categories')).map(c => {
      return {
        value: c._id,
        text: `${c.name}`
      }
    }))
  },
  methods: {
    addLang() {
      this.counter++;
      this.song.contents.push({language: null, content: null})
    },
    async play() {
      if (this.playing) {
        await this.$refs.audioPlayer.pause();
        this.$refs.audioPlayer.currentTime = 0;
      } else {
        await this.$refs.audioPlayer.play();
      }
      this.playing = !this.playing;
    },
    async onCreate() {
      this.$refs.form.classList.add('was-validated');

      if (
        !this.song.title ||
        !this.song.authorId ||
        !this.song.categoryId ||
        !this.song.contents
      ) {
        this.$toast.error('Napaka v vnosnih poljih', {duration: 2000});
        return;
      }

      // this.song.title = this.$refs.form.title.value;
      // this.song.author = this.$refs.form.author.value;
      // this.song.category = this.$refs.form.category.value;
      this.song.contents = this.song.contents.map(c => ({
        content: c.content.replaceAll('\n', '<br>'),
        language: c.language,
      }));
      // this.song.url = this.$refs.form.url.value;

      await this.$axios.$post('/songs', this.song)
        .then(res => {
          this.$toast.success('Pesem uspešno dodana', {duration: 2000});
          this.resetForm();
        })
        .catch(rej => {
          console.error(rej);
          this.$toast.error('Napaka pri dodajanju pesmi', {duration: 2000});
        });
    },
    async onUpdate() {
      this.$refs.form.classList.add('was-validated');

      if (
        !this.song.title ||
        !this.song.authorId ||
        !this.song.categoryId ||
        !this.song.contents
      ) {
        this.$toast.error('Napaka v vnosnih poljih', {duration: 2000});
        return;
      }

      delete this.song.content;
      this.song.contents = this.song.contents.map(c => ({
        content: c.content?.replaceAll('\n', '<br>'),
        language: c.language,
      }));

      await this.$axios.$put(`/songs/${this.id}`, this.song)
        .then(res => {
          this.$toast.success('Pesem uspešno posodobljena', {duration: 2000});
          this.song = res
          // this.song.content = this.song.content.replaceAll('<br>', '\n')
          this.song.contents = this.song?.contents.map(c => ({
            content: c?.content?.replaceAll('<br>', '\n'),
            language: c?.language,
          }));

          this.song.authorId = this.song?.author?._id
          this.song.categoryId = this.song?.category?._id
        })
        .catch(rej => {
          console.error(rej);
          this.$toast.error('Napaka pri posodabljanju pesmi', {duration: 2000});
        });
    },
    resetForm() {
      this.song.title = '';
      this.song.authorId = null;
      this.song.categoryId = null;
      this.song.content = '';
      this.song.url = '';
      this.$refs.form.classList.remove('was-validated');
    },
    setActive(lang) {
      console.log('set active')
      // Save previously written content
      const idx = this.song.contents.findIndex((c) => c.lang === this.activeVersion);
      if (this.activeContent.length > 0) {
        this.song.contents[idx] = {
          lang: this.activeVersion,
          content: this.activeContent,
        }
      } else {
        this.song.contents.splice(idx, 1);
      }
      // Change language
      this.activeVersion = lang
      // Fill content if available
      const songVersion = this.song.contents.find((c) => c.lang === this.activeVersion)
      // If no content, add the language to song
      if (!songVersion) {
        this.song.contents.push({lang: lang, content: ''})
        this.activeContent = ""
      } else {
        this.activeContent = songVersion.content
      }
      this.counter++;
    },
    hasContent(lang) {
      const version = this.song.contents.find((c) => c.lang === lang);
      if (version?.content?.length > 0) {
        return 2;
      } else if (version?.content?.length === 0) {
        return 1;
      }
      return 0;
    },
    updateField() {
      console.log('focus out')
      const idx = this.song.contents.findIndex((c) => c.lang === this.activeVersion);
      this.song.contents[idx] = {
        lang: this.activeVersion,
        content: this.activeContent,
      }
      this.counter++;
    }
  }
}
</script>

<style scoped>
.active {
  color: goldenrod;
}
</style>
