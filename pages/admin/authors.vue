<template>
  <b-container>
    <b-row>
      <b-col offset-md="2" md="8" cols="12" class="my-3">
        <h1>Avtorji</h1>

        <!-- ADD NEW -->
        <div class="mt-3">
          <span class="d-block">
            <b>{{ authorId ? 'Uredi' : 'Dodaj' }}</b>
            <span v-if="authorId" class="text-muted"> (Počisti polja za dodajanje novega avtorja)</span>
          </span>
          <b-input-group class="my-3">
            <b-input type="text" class="form-control" placeholder="Dodaj ime" v-model="authorName"/>
            <b-input type="text" class="form-control" placeholder="Dodaj priimek" v-model="authorSurname"
                     @keydown.enter.prevent="addUpdate"/>
            <b-form-select v-model="authorCategoryId" class="form-control" id="category"
                           :options="categories" />
            <div class="input-group-append cursor-pointer" @click="addUpdate">
              <div class="input-group-text fake-button">
                <span
                  class="material-icons icon-button"
                >
                  {{ authorId ? 'system_update_alt' : 'add' }}
                </span>
              </div>
            </div>
          </b-input-group>
        </div>

        <!-- TABLE -->
        <table class="mt-3 table table-hover">
          <thead>
          <tr>
            <th scope="col">Ime</th>
            <th scope="col">Priimek</th>
            <th scope="col">Zvrst</th>
            <th scope="col" class="text-right">Dejanja</th>
          </tr>
          </thead>

          <tr v-for="author of authors">
            <td>{{ author.firstName }}</td>
            <td>{{ author.lastName }}</td>
            <td>{{ author.category ? author.category.name : '' }}</td>
            <td class="text-right">
              <b @click="removeCat(author)" class="text-danger cursor-pointer mr-2">Izbriši</b>
              <b @click="updateCat(author)" class="text-info cursor-pointer">Uredi</b>
            </td>
          </tr>
        </table>
        <div v-if="!authors.length" class="text-center my-4">Ni avtorjev</div>
        <div class="text-muted">Brisani avtor ne sme imeti objavljenih pesmi.</div>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "authors",
  data() {
    return {
      authorName: null,
      authorSurname: null,
      authorId: null,
      authorCategoryId: null,
      categories: [
        {value: null, text: 'Prosim izberi zvrst'},
      ],
    }
  },
  computed: {
    ...mapGetters({
      authors: 'authors/get',
    })
  },
  watch: {
    authorName() {
      if (this.authorName?.length === 0 && this.authorSurname?.length === 0) {
        this.authorId = null;
        this.authorCategoryId = null;
      }
    },
    authorSurname() {
      if (this.authorName?.length === 0 && this.authorSurname?.length === 0) {
        this.authorId = null;
        this.authorCategoryId = null;
      }
    }
  },
  async created() {
    await this.$store.dispatch('authors/fetch');
    this.categories.push(...(await this.$axios.$get('/categories')).map(c => {
      return {
        value: c._id,
        text: `${c.name}`
      }
    }))

  },
  methods: {
    async removeCat(author) {
      await this.$store.dispatch('authors/remove', author._id);
      await this.$store.dispatch('authors/fetch');
    },
    updateCat(author) {
      this.authorName = author?.firstName;
      this.authorSurname = author?.lastName;
      this.authorCategoryId = author?.category?._id || null;
      this.authorId = author?._id;
    },
    async addUpdate() {
      if (!this.authorName || !this.authorSurname || !this.authorCategoryId) {
        this.$toast.error('Polje ne sme biti prazno', {duration: 3000});
        return;
      }

      if (this.authorId) {
        this.$axios.$post(`/author/${this.authorId}`, {
          firstName: this.authorName,
          lastName: this.authorSurname,
          categoryId: this.authorCategoryId,
        })
          .then(async res => {
            this.$toast.success(`Avtor "${this.authorName} ${this.authorSurname}" uspešno posodobljen`, {duration: 3000});
            this.authorId = null;
            this.authorName = null;
            this.authorSurname = null;
            this.authorCategoryId = null;
            await this.$store.dispatch('authors/fetch');
          })
          .catch(res => {
            console.error(res)
            this.$toast.error('Napaka pri posodabljanju avtorja', {duration: 3000});
          })
      } else {
        this.$axios.$post(`/author`, {
          firstName: this.authorName,
          lastName: this.authorSurname,
          categoryId: this.authorCategoryId,
        })
          .then(async res => {
            this.$toast.success(`Avtor "${this.authorName} ${this.authorSurname}" uspešno dodan`, {duration: 3000});
            this.authorName = null;
            this.authorSurname = null;
            this.authorCategoryId = null;
            await this.$store.dispatch('authors/fetch');
          })
          .catch(res => {
            console.error(res)
            this.$toast.error('Napaka pri dodajanje avtorja', {duration: 3000});
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
