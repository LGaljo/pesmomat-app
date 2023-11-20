<template>
  <b-modal
    ref="dialog"
    centered
    :title="title"
    :size="size"
    :dialog-class="dialogClass"
    hide-header
    :no-close-on-backdrop="persistent"
    :no-close-on-esc="persistent"
    @hidden="onHidden"
    @shown="onShown"
  >
    <div :slot="'default'">
      <slot name="body"></slot>
    </div>
    <div :slot="'modal-footer'" class="mt-2 p-0 w-100">
      <div class="d-flex justify-content-around">
        <div v-if="action" class="mx-2">
          <GenerateButton v-if="pagetype === 'generate'" :action="action" @click="onFirst" />
          <DefaultButton v-else :action="action" @click="onFirst" />
        </div>
        <div v-if="secAction" class="mx-2">
          <GenerateButton v-if="pagetype === 'generate'" :action="secAction" @click="onSecond" />
          <DefaultButton v-else :action="secAction" @click="onSecond" />
        </div>
        <div v-if="closeAction" class="mx-2">
          <GenerateButton v-if="pagetype === 'generate'" :action="closeAction" @click="onClose" />
          <DefaultButton v-else :action="closeAction" @click="onClose" />
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import GenerateButton from "./GenerateButton.vue";
import DefaultButton from "./DefaultButton.vue";

export default {
  name: "ModalDialog",
  components: {GenerateButton, DefaultButton},
  props: {
    title: {
      type: String,
      default: "",
    },
    action: {
      type: String,
    },
    secAction: {
      type: String,
    },
    closeAction: {
      type: String,
      default: 'Prekliči'
    },
    size: {
      type: String,
    },
    dialogClass: {
      type: String,
      default: 'default-dialog'
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    pagetype: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    open() {
      this.$refs.dialog.show()
    },
    close() {
      this.$refs.dialog.hide()
    },
    onClose() {
      this.$emit('cancel')
      this.close()
    },
    onHidden() {
      this.$emit('hidden')
    },
    onShown() {
      this.$emit('shown')
    },
    onFirst() {
      this.$emit('first')
      this.close()
    },
    onSecond() {
      this.$emit('second')
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
