<template>
  <b-modal
    ref="dialog"
    centered
    :title="title"
    :size="size"
    :dialog-class="dialogClass"
    hide-header
  >
    <div :slot="'default'">
      <slot name="body"></slot>
    </div>
    <div :slot="'modal-footer'" class="mt-4 w-100">
      <div class="d-flex justify-content-around">
        <div class="mx-2">
          <Button
            v-if="action"
            :action="action"
            @click="onFirst"
          >
            {{ action }}
          </Button>
        </div>
        <div class="mx-2">
          <Button
            v-if="secAction"
            :action="secAction"
            @click="onSecond"
          >
            {{ secAction }}
          </Button>
        </div>
        <div class="mx-2">
          <Button
            :action="closeAction"
            @click="close"
          >
          </Button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import Button from "../components/Button.vue";

export default {
  name: "ModalDialog",
  components: {Button},
  props: {
    title: {
      type: String,
      required: true
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
    }
  },
  methods: {
    open() {
      this.$refs.dialog.show()
    },
    close() {
      this.$refs.dialog.hide()
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
