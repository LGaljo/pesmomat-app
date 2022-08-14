<template>
  <b-container>
    <b-row>
      <b-col offset-md="3" md="6" cols="12" class="my-3">
        <h1>Obdobja</h1>

        <!-- ADD NEW -->
        <div class="mt-3">
          <span class="d-block">
            <b>{{ categoryId ? 'Uredi' : 'Dodaj' }}</b>
            <span v-if="categoryId" class="text-muted"> (Počisti polje za dodajanje novega obdobja)</span>
          </span>
          <b-input-group class="my-3">
            <input type="text" class="form-control" placeholder="Dodaj obdobje" v-model="categoryNew"
                   aria-describedby="basic-addon2" @keydown.enter.prevent="addUpdateCategory">
            <div class="input-group-append cursor-pointer" @click="addUpdateCategory">
            <span class="input-group-text fake-button" id="basic-addon2">
              <span
                class="material-icons icon-button"
              >
                {{ categoryId ? 'system_update_alt' : 'add' }}
              </span>
            </span>
            </div>
          </b-input-group>
        </div>

        <!-- TABLE -->
        <table class="mt-3 table table-hover">
          <thead>
          <tr>
            <th scope="col">Ime</th>
            <th scope="col" class="text-right">Dejanja</th>
          </tr>
          </thead>

          <tr v-for="category of categories">
            <td>{{ category.name }}</td>
            <td class="text-right">
              <b @click="removeCat(category)" class="text-danger cursor-pointer mr-2">Izbriši</b>
              <b @click="updateCat(category)" class="text-info cursor-pointer">Uredi</b>
            </td>
          </tr>
        </table>
        <div v-if="!categories.length" class="text-center my-4">Ni obdobij</div>
        <div class="text-muted">Brisano obdobje ne sme vsebovati pesmi.</div>

      </b-col>
    </b-row>
  </b-container>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "categories",
  data() {
    return {
      categoryNew: null,
      categoryId: null,
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories/get'
    })
  },
  watch: {
    categoryNew() {
      if (this.categoryNew?.length === 0) {
        this.categoryId = null;
      }
    }
  },
  async created() {
    await this.$store.dispatch('categories/fetch');
  },
  methods: {
    async removeCat(category) {
      await this.$store.dispatch('categories/remove', category._id);
      await this.$store.dispatch('categories/fetch');
    },
    updateCat(category) {
      this.categoryNew = category?.name;
      this.categoryId = category?._id;
    },
    async addUpdateCategory() {
      if (!this.categoryNew) {
        this.$toast.error('Polje ne sme biti prazno', {duration: 3000});
      }

      if (this.categoryId) {
        this.$axios.$post(`/categories/${this.categoryId}`, {name: this.categoryNew})
          .then(async res => {
            this.$toast.success(`Obdobje "${this.categoryNew}" uspešno posodobljeno`, {duration: 3000});
            this.categoryNew = null;
            await this.$store.dispatch('categories/fetch');
          })
          .catch(res => {
            console.error(res)
            this.$toast.error('Napaka pri posodabljanju obdobja', {duration: 3000});
          })
      } else {
        this.$axios.$post(`/categories`, {name: this.categoryNew})
          .then(async res => {
            this.$toast.success(`Obdobje "${this.categoryNew}" uspešno dodano`, {duration: 3000});
            this.categoryNew = null;
            await this.$store.dispatch('categories/fetch');
          })
          .catch(res => {
            console.error(res)
            this.$toast.error('Napaka pri dodajanje obdobja', {duration: 3000});
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
