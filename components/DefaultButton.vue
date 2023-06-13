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
  background: map-get($default-colours, 'background');
  color: map-get($default-colours, 'text');
  border: 2px solid map-get($default-colours, 'text');
  border-radius: 15px;
  font-weight: 800;
  min-width: 160px;
  text-transform: uppercase;
}

.custom-button:hover {
  background: map-get($default-colours, 'background-dark');
  color: map-get($default-colours, 'text');
}

.custom-button:focus {
  background: map-get($default-colours, 'background-darker');
  color: map-get($default-colours, 'text-dark');
}

</style>

