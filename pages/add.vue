<template>
  <div class="offset-3 col-6 offset-md-0 col-md-12">
    <form class="w-100" @submit.prevent="onSubmit" ref="form" novalidate>
      <div class="form-group">
        <label for="title">Naslov pesmi</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Vnesi naslov"
        >
      </div>

      <div class="form-group">
        <label for="url">Povezava</label>
        <input
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

      <div class="form-group">
        <label for="author">Avtor</label>
        <input
          type="text"
          class="form-control"
          id="author"
          placeholder="Avtor pesmi"
          required
        >
        <div class="invalid-feedback">
          Prosim vnesi avtorja.
        </div>
      </div>

      <div class="form-group">
        <label for="content">Pesem</label>
        <textarea class="form-control" id="content" rows="15" required></textarea>
        <div class="invalid-feedback">
          Prosim vnesi besedilo pesmi.
        </div>
      </div>

      <b-button type="submit" class="btn-primary">Dodaj</b-button>
    </form>
  </div>
</template>

<script>
import SongCard from "@/components/SongCard";

export default {
  name: "add.vue",
  components: {SongCard},
  data() {
    return {
      song: {
        title: '',
        author: '',
        content: '',
        url: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      this.$refs.form.classList.add('was-validated');

      if (
        !this.$refs.form.title.checkValidity() ||
        !this.$refs.form.author.checkValidity() ||
        !this.$refs.form.content.checkValidity() ||
        !this.$refs.form.url.checkValidity()
      ) {
        this.$toast.error('Napaka v vnosnih poljih', { duration: 2000 });
        return;
      }

      this.song.title = this.$refs.form.title.value;
      this.song.author = this.$refs.form.author.value;
      this.song.content = this.$refs.form.content.value.replaceAll('\n', '<br>');
      this.song.url = this.$refs.form.url.value;

      await this.$axios.$post('/songs', this.song)
        .then(res => {
          console.log(res);
          this.$toast.success('Pesem uspešno dodana', { duration: 2000 });
          this.$refs.form.title = '';
          this.$refs.form.author = '';
          this.$refs.form.content = '';
          this.$refs.form.url = '';
        })
        .catch(rej => {
          console.error(rej);
          this.$toast.error('Napaka pri dodajanju pesmi', { duration: 2000 });
        });
    }
  }
}
</script>

<style scoped>

</style>
