<template>
  <b-container>
    <b-row>
      <b-col offset-md="2" md="8" cols="12" class="mt-5 my-3">
        <h3 class="text-center font-weight-bold page-title">{{ $t('generate.title') }}</h3>

        <div style="height: 50px"></div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" class="grey-select">
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
    <b-row class="mt-4">
      <b-col cols="6" class="mt-2 lightgrey-select">
        <b-form-select
          v-model="selected.rhyme"
          class="form-control"
          size="lg"
          id="rhyme"
        >
          <b-form-select-option :value="null">{{ $t('generate.select.rhyme') }}</b-form-select-option>
          <b-form-select-option
            v-for="option of options.rhyme"
            :key="'b-' + option.value"
            :value="option.text"
          >
            {{ option.text }}
          </b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col cols="6" class="mt-2 lightgrey-select">
        <b-form-select
          v-model="selected.length"
          class="form-control"
          size="lg"
          id="length"
        >
          <b-form-select-option :value="null">{{ $t('generate.select.length') }}</b-form-select-option>
          <b-form-select-option
            v-for="option of options.length"
            :key="'b-' + option.value"
            :value="option.text"
          >
            {{ option.text }}
          </b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col cols="6" class="mt-2 lightgrey-select">
        <b-form-select
          v-model="selected.stanza"
          class="form-control"
          size="lg"
          id="stanza"
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
    </b-row>
    <b-row class="mt-5">
      <b-col cols="12">
        <div class="text-center">
          <b-button size="lg" squared class="button-gen" @click="buyPoem">{{ $t('generate.create') }}</b-button>
        </div>
      </b-col>
    </b-row>
    <ModalDialog
      ref="poemdialog"
      size="lg"
      dialog-class="generate-modal"
      title=""
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
      ref="buydialog"
      size="md"
      dialog-class="generate-modal"
      title=""
      @first="generatePoem"
      action="JA"
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
import ModalDialog from "../../components/ModalDialog.vue";

export default {
  name: 'index',
  layout: 'generate',
  components: {ModalDialog},
  data() {
    return {
      options: {
        stanza: [
          {text: 'a', value: 'a'},
          {text: 'b', value: 'b'},
          {text: 'c', value: 'c'},
          {text: 'd', value: 'd'},
        ],
        length: [
          {text: 4, value: 4},
          {text: 8, value: 8},
          {text: 10, value: 10},
          {text: 12, value: 12},
        ],
        rhyme: [
          {text: 'a', value: 'a'},
          {text: 'b', value: 'b'},
          {text: 'c', value: 'c'},
          {text: 'd', value: 'd'},
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
        length: null,
        stanza: null,
      },
      generated: {
        title: 'Ni naslova',
        content: 'Tukaj bo pesem'
      }
    }
  },
  async created() {
    await this.$store.dispatch('songs/fetch', {page: 0, limit: 50, noBody: true});
  },
  computed: {
    ...mapGetters({
      coins: 'coins/get',
      songs: 'songs/get'
    }),
  },
  methods: {
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
    async generatePoem() {
      if (
        !!this.selected.A &&
        !!this.selected.B &&
        !!this.selected.rhyme &&
        !!this.selected.stanza &&
        !!this.selected.length
      ) {
        this.$refs.dialog.open()
        await this.$axios.$post('/generate', {
          A: this.selected.A._id,
          B: this.selected.B._id,
          rhyme: this.selected.rhyme,
          stanza: this.selected.stanza,
          length: this.selected.length,
        })
          .then((res) => {
            this.generated.title = res?.tile
            this.generated.content = res?.content
            this.$refs.dialog.open()
          })
      }
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
