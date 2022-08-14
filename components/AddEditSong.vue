<template>
  <form class="w-100" ref="form" novalidate @submit.prevent="">
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
      <b-form-select v-model="song.authorId" class="form-control" id="author" :options="options.authors"></b-form-select>
      <div class="invalid-feedback">
        Prosim vnesi avtorja.
      </div>
    </div>

    <!-- Obdobje -->
    <div class="form-group">
      <label for="category">Obdobje</label>
      <b-form-select v-model="song.categoryId" class="form-control" id="category" :options="options.categories"></b-form-select>
      <div class="invalid-feedback">
        Prosim vnesi obdobje.
      </div>
    </div>

    <div class="form-group">
      <label for="content">Pesem</label>
      <textarea v-model="song.content" class="form-control" id="content" rows="15" required></textarea>
      <div class="invalid-feedback">
        Prosim vnesi besedilo pesmi.
      </div>
    </div>

    <b-button v-if="!id" type="submit" @click.prevet.stop="onCreate" class="btn-primary">Dodaj</b-button>
    <b-button v-else type="submit" @click.prevet.stop="onUpdate" class="btn-primary">Posodobi</b-button>
  </form>
</template>

<script>
import SongCard from "@/components/SongCard";

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
      song: {
        title: null,
        author: null,
        authorId: null,
        categoryId: null,
        content: null,
        url: null
      },
      options: {
        authors: [
          {value: null, text: 'Prosim izberi avtorja'},
        ],
        categories: [
          {value: null, text: 'Prosim izberi obdobje'},
        ]
      }
    }
  },
  async created() {
    if (this.id) {
      this.song = await this.$axios.$get(`/songs/${this.id}`)
      this.song.content = this.song?.content?.replaceAll('<br>', '\n')
      this.song.authorId = this.song?.author?._id || null
      this.song.categoryId = this.song?.category?._id || null
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
    async onCreate() {
      this.$refs.form.classList.add('was-validated');

      if (
        !this.$refs.form.title.checkValidity() ||
        !this.song.authorId ||
        !this.song.categoryId ||
        !this.$refs.form.content.checkValidity() ||
        !this.$refs.form.url.checkValidity()
      ) {
        this.$toast.error('Napaka v vnosnih poljih', { duration: 2000 });
        return;
      }

      this.song.title = this.$refs.form.title.value;
      this.song.author = this.$refs.form.author.value;
      this.song.category = this.$refs.form.category.value;
      this.song.content = this.$refs.form.content.value.replaceAll('\n', '<br>');
      this.song.url = this.$refs.form.url.value;

      await this.$axios.$post('/songs', this.song)
        .then(res => {
          this.$toast.success('Pesem uspešno dodana', { duration: 2000 });
          this.song.title = '';
          this.song.authorId = null;
          this.song.categoryId = null;
          this.song.content = '';
          this.song.url = '';
          this.$refs.form.classList.remove('was-validated');
        })
        .catch(rej => {
          console.error(rej);
          this.$toast.error('Napaka pri dodajanju pesmi', { duration: 2000 });
        });
    },
    async onUpdate() {
      this.$refs.form.classList.add('was-validated');

      if (
        !this.$refs.form.title.checkValidity() ||
        !this.song.authorId ||
        !this.song.categoryId ||
        !this.$refs.form.content.checkValidity() ||
        !this.$refs.form.url.checkValidity()
      ) {
        this.$toast.error('Napaka v vnosnih poljih', { duration: 2000 });
        return;
      }

      this.song.content = this.song.content.replaceAll('\n', '<br>');

      await this.$axios.$put(`/songs/${this.id}`, this.song)
        .then(res => {
          this.$toast.success('Pesem uspešno posodobljena', { duration: 2000 });
          this.song = res
          this.song.content = this.song.content.replaceAll('<br>', '\n')
          this.song.authorId = this.song?.author?._id
          this.song.categoryId = this.song?.category?._id
        })
        .catch(rej => {
          console.error(rej);
          this.$toast.error('Napaka pri posodabljanju pesmi', { duration: 2000 });
        });
    }
  }
}
</script>

<style scoped>

</style>
