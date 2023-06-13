<template>
  <b-button
    :type="type"
    :size="size"
    class="custom-button"
    @click="execute"
    variant="none"
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
  background: map-get($generate-colours, 'background');
  color: map-get($generate-colours, 'text');
  border: 2px solid map-get($generate-colours, 'text');
  border-radius: 15px;
  min-width: 160px;
  text-transform: uppercase;
}

.custom-button:hover {
  background: map-get($generate-colours, 'background-dark');
  color: map-get($generate-colours, 'text');
}

.custom-button:focus {
  background: map-get($generate-colours, 'background-darker');
  color: map-get($generate-colours, 'text-dark');
}

</style>

