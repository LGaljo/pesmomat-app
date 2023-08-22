<template>
  <b-container>
    <!-- Title -->
    <b-row>
      <b-col offset-md="2" md="8" cols="12" class="mt-5 my-3">
        <h3 class="text-center font-weight-bold page-title">{{ $t('generate.title') }}</h3>

        <div style="height: 30px"></div>
      </b-col>
    </b-row>

    <!-- Dropdowns -->
    <b-row>
      <b-col cols="6" class="grey-select">
        <label for="a">{{ $t('generate.select.A') }}</label>
        <b-form-select
          v-model="selected.A"
          class="form-control"
          id="a"
          size="lg"
          @change="itemSelected('A')"
        >
          <b-form-select-option :value="null">{{ $t('generate.select.A') }}</b-form-select-option>
          <b-form-select-option
            v-for="option of songs"
            :key="'a-' + option._id"
            :value="option"
          >
            {{ option.title }}
          </b-form-select-option>
        </b-form-select>

        <b-card class="card-custom my-2">
          <div v-html="selected.text.A"></div>
        </b-card>
      </b-col>
      <b-col cols="6" class="grey-select">
        <label for="b">{{ $t('generate.select.B') }}</label>
        <b-form-select
          v-model="selected.B"
          class="form-control"
          id="b"
          size="lg"
          @change="itemSelected('B')"
        >
          <b-form-select-option :value="null">{{ $t('generate.select.B') }}</b-form-select-option>
          <b-form-select-option
            v-for="option of songs"
            :key="'b-' + option._id"
            :value="option"
          >
            {{ option.title }}
          </b-form-select-option>
        </b-form-select>
        <b-card class="card-custom my-2">
          <div v-html="selected.text.B"></div>
        </b-card>
      </b-col>
    </b-row>

    <!-- Options -->
    <b-row class="mt-2">
      <b-col cols="6" class="mt-3 lightgrey-select">
        <label for="verse">{{ $t('generate.select.length') }}</label>
        <b-form-select
          v-model="selected.verse"
          class="form-control"
          size="lg"
          id="verse"
          @change="selectRyhme"
        >
          <b-form-select-option :value="null">{{ $t('generate.select.length') }}</b-form-select-option>
          <b-form-select-option
            v-for="option of options.verse"
            :key="'b-' + option.value"
            :value="option.text"
          >
            {{ option.text }}
          </b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col cols="6" class="mt-3 lightgrey-select">
        <label for="verse">{{ $t('generate.select.stanza') }}</label>
        <b-form-select
          v-model="selected.stanza"
          class="form-control"
          size="lg"
          id="stanza"
          @change="selectRyhme"
        >
          <b-form-select-option :value="null">{{ $t('generate.select.stanza') }}</b-form-select-option>
          <b-form-select-option
            v-for="option of options.stanza"
            :key="'b-' + option.value"
            :value="option.text"
          >
            {{ option.text }}
          </b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col cols="6" class="mt-3 lightgrey-select">
        <label for="rhyme">{{ $t('generate.select.stanza') }}</label>
        <b-form-select
          v-model="selected.rhyme"
          :key="counter"
          class="form-control"
          size="lg"
          id="rhyme"
          :disabled="!selected.stanza || !selected.verse"
        >
          <b-form-select-option :value="null">{{ $t('generate.select.rhyme') }}</b-form-select-option>
          <b-form-select-option
            v-for="option of options.ryhme"
            :key="'b-' + option.value"
            :value="option.text"
          >
            {{ option.text }}
          </b-form-select-option>
        </b-form-select>
      </b-col>
    </b-row>

    <!-- Submit button -->
    <b-row class="mt-5">
      <b-col cols="12">
        <div class="text-center">
          <b-button
            size="lg"
            squared
            class="button-gen"
            @click="generatePoem"
            :disabled="!selected.A || !selected.B || !selected.stanza || !selected.rhyme || !selected.verse"
          >
            {{ $t('generate.create') }}
          </b-button>
        </div>
      </b-col>
    </b-row>

    <ModalDialog
      ref="poemdialog"
      size="lg"
      dialog-class="generate-modal"
      pagetype="generate"
    >
      <template #body>
        <div class="modal-title text-center">
          {{ generated.title }}
        </div>
        <div>
          {{ generated.content }}
        </div>
      </template>
    </ModalDialog>

    <ModalDialog
      ref="fundsdialog"
      size="lg"
      dialog-class="generate-modal"
      @cancel="redirectBack"
      :action="$t('actions.ok')"
      persistent
      pagetype="generate"
    >
      <template #body>
        <div class="modal-title text-center">
          {{ $t('modals.insufficient.title') }}
        </div>
      </template>
    </ModalDialog>

    <ModalDialog
      ref="buydialog"
      size="md"
      dialog-class="generate-modal"
      @first="subtractCoins"
      @cancel="redirectBack"
      :action="$t('actions.yes')"
      persistent
      pagetype="generate"
    >
      <template #body>
        <div class="modal-title text-center">
          {{ $t('generate.buy') }}
        </div>
      </template>
    </ModalDialog>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";
import ModalDialog from "../components/ModalDialog.vue";

export default {
  name: 'generate',
  layout: 'generate',
  components: {ModalDialog},
  data() {
    return {
      counter: 0,
      options: {
        ryhme: [],
        rhymes: {
          1: [
            { text: 'a', value: 'a' },
          ],
          2:
            [
              { text: 'a-a', value: 'a-a' },
              { text: 'a-b', value: 'a-b' },
            ],
          3:
            [
              { text: 'a-b-a', value: 'a-b-a' },
              { text: 'a-a-b', value: 'a-a-b' },
              { text: 'a-b-b', value: 'a-b-b' },
            ],
          4:
            [
              { text: 'a-b-a-b', value: 'a-b-a-b' },
              { text: 'a-b-b-a', value: 'a-b-b-a' },
              { text: 'a-a-b-b', value: 'a-a-b-b' },
            ],
          5:
            [
              { text: 'a-b-a-b-a', value: 'a-b-a-b-a' },
              { text: 'a-b-b-a-c', value: 'a-b-b-a-c' },
              { text: 'a-a-b-b-c', value: 'a-a-b-b-c' },
            ],
        },
        verse: [
          {text: 1, value: 1},
          {text: 2, value: 2},
          {text: 3, value: 3},
          {text: 4, value: 4},
          {text: 5, value: 5},
        ],
        stanza: [
          {text: 1, value: 1},
          {text: 2, value: 2},
          {text: 3, value: 3},
          {text: 4, value: 4},
        ],
      },
      selected: {
        A: null,
        B: null,
        text: {
          A: null,
          B: null,
        },
        rhyme: null,
        verse: null,
        stanza: null,
      },
      generated: {
        title: 'Ni naslova',
        content: 'Tukaj bo pesem'
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('songs/fetch', {page: 0, limit: null, noBody: true});
    // this.buyPoem()
  },
  computed: {
    ...mapGetters({
      coins: 'coins/get',
      songs: 'songs/get'
    }),
  },
  methods: {
    selectRyhme() {
      console.log('select ryhme')
      if (!!this.selected.stanza && !!this.selected.verse) {
        console.log(this.options.rhymes, this.selected.stanza, this.options.rhymes[this.selected.stanza])
        this.options.ryhme = this.options.rhymes[this.selected.stanza]
        this.counter++
      }
    },
    itemSelected(side) {
      const id = this.selected[side]?._id;
      this.$axios.$get(`/songs/${id}`)
        .then((res) => {
          this.selected.text[side] = res.contents[0]?.content
        })
    },
    buyPoem() {
      this.$refs.buydialog.open()
    },
    async subtractCoins() {
      if (this.coins < 1) {
        // Request a coin to be inserted
        this.$refs.fundsdialog.open()
      } else {
        // Subtract a coin
        await this.$store.dispatch('coins/reduce')
      }
    },
    async generatePoem() {
      if (
        !!this.selected.A &&
        !!this.selected.B &&
        !!this.selected.rhyme &&
        !!this.selected.stanza &&
        !!this.selected.verse
      ) {
        await this.$axios.$post('/generate', {
          A: this.selected.A._id,
          B: this.selected.B._id,
          rhyme: this.selected.rhyme,
          stanza: this.selected.stanza,
          length: this.selected.verse,
        })
          .then((res) => {
            this.generated.title = res?.tile
            this.generated.content = res?.content
            this.$refs.poemdialog.open()
          })
      }
    },
    redirectBack() {
      this.$router.replace('/')
    }
  },
}

</script>

<style lang="scss" scoped>
.card-custom {
  border: none !important;
  background: rgba(0, 0, 0, 0.25);
  overflow: auto !important;
  max-height: 30vh;
  height: 30vh;
}

.button-gen {
  color: black;
  background: #7E7E7E;
}

.custom-select {
  border-radius: 0;
}

.modal-title {
  font-size: 33px;
  color: #FFE5B8;
}

</style>
