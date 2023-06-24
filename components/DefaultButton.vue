<template>
  <b-button
    :type="type"
    :size="size"
    class="custom-button btn-none"
    @click="execute"
    variant="none"
  >
    {{ action }}
  </b-button>
</template>

<script>
export default {
  name: "DefaultButton",
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
  background: map-get($default-colours, 'background') !important;
  color: map-get($default-colours, 'text') !important;
  border: 2px solid map-get($default-colours, 'text') !important;
  border-radius: 15px !important;
  font-weight: 800 !important;
  min-width: 160px !important;
  text-transform: uppercase !important;
}

.custom-button:hover {
  background: map-get($default-colours, 'background-dark') !important;
  color: map-get($default-colours, 'text') !important;
}

.custom-button:focus {
  background: map-get($default-colours, 'background-darker') !important;
  color: map-get($default-colours, 'text-dark') !important;
}

</style>

