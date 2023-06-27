<template>
  <b-container>
    <b-row>
      <b-col cols="12" class="my-3 browse-bg px-0">
        <b-img src="/img/default/gears_top_14.svg" class="w-100 mb-4" />
        <div class="p-2 text-center">
          <div class="cursor-pointer" @click="openSearchDialog">
            <div class="search_title pt-3">{{ $t('browse.input_text') }}</div>
            <b-img src="/img/default/search_green.svg" class="my-4"/>
          </div>

          <div class="position-relative pb-4">
            <b-img src="/img/default/gears_title.svg" class="my-4 w-100 position-absolute" style="top: 0; left: 0;"/>
            <div class="search_title pt-3 text-uppercase" style="padding-top: 2rem !important;">{{ $t('browse.or') }}</div>
          </div>

          <div class="mt-4">
            <div class="search_title mb-4">{{ $t('browse.choose_cat') }}</div>
            <DefaultButton
              v-for="catname of categories"
              :key="catname.value"
              class="my-2 cat_btn"
              :action="catname.name"
              @click="openCat(catname.value)"
            />
          </div>

        </div>
        <b-img src="/img/default/gears_bottom_14.svg" class="w-100 mt-4 position-absolute" style="bottom: 0;"/>
      </b-col>
    </b-row>
    <ModalDialog
      ref="searchdialog"
      :action="$t('actions.search')"
      @first="search"
      pagetype="default"
      dialog-class="default-modal"
      @hidden="$eventBus.$emit('keyboard', false)"
    >
      <template #body>
        <b-form-input class="default-input" v-model="term" :placeholder="$t('browse.placeholder')"></b-form-input>
      </template>
    </ModalDialog>
  </b-container>
</template>

<script>
import DefaultButton from "../../components/DefaultButton.vue";
import ModalDialog from "../../components/ModalDialog.vue";

export default {
  name: "browse",
  layout: 'default',
  components: {ModalDialog, DefaultButton},
  data() {
    return {
      categories: [],
      term: null,
    }
  },
  async mounted() {
    this.categories.push({
      name: this.$t('browse.popular'),
      value: "popular"
    })
    if (this.$config.ENABLE_STATS) {
      this.categories.push({
        name: this.$t('browse.periods'),
        value: "periods"
      })
    }
    this.$eventBus.$on('keyinput', this.keyInput)
    this.$eventBus.$on('keypress', this.keyInput)
  },
  computed: {
  },
  methods: {
    async openCat(category) {
      console.log(category)
      if (category === 'popular') {
        await this.$router.push('/browse/popular')
      } else if (category === 'periods') {
        await this.$router.push('/browse/categories')
      }
    },
    search() {
      this.$router.push({ path: this.localePath('/browse/songs'), query: { search: this.term } })
    },
    openSearchDialog() {
      this.term = ''
      this.$refs.searchdialog.open()
      this.$eventBus.$emit('keyboard', true)
    },
    keyInput(value) {
      if (value === '{enter}') {
        this.search()
      } else if (!value.startsWith('{')) {
        this.term = value;
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "scss/custom";

.browse-bg {
  height: 75vh;
  background-color: map-get($default-colours, 'background');
  border-radius: 20px;
}

.search_title {
  font-family: MAGIONA_DISPLAY, serif;
  color: map-get($default-colours, 'text');
  font-size: 36px;
}

.cat_btn {
  width: 65%;
}
</style>
