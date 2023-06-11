<template>
  <b-button
    :type="type"
    :size="size"
    class="custom-button"
    @click="execute"
  >
    {{ action }}
  </b-button>
</template>

<script>
export default {
  name: "ModalDialog",
  props: {
    action: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "button"
    },
    size: {
      type: String,
      default: 'lg',
    },
    dialogClass: {
      type: String,
      default: 'default-dialog'
    }
  },
  methods: {
    execute() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "scss/custom";
.custom-button {
  background: map-get($theme-colors, 'generate-background');
  color: map-get($theme-colors, 'generate-text');
  border: 2px solid map-get($theme-colors, 'generate-text');
  border-radius: 15px;
  min-width: 160px;
  text-transform: uppercase;
}
</style>

