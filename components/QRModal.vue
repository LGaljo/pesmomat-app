<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div
          class="modal-container"
          v-click-outside="onClickOutside"
        >

          <div class="modal-body text-center">
            <qrcode-vue :value="url" :size="size" level="Q" />
          </div>

          <div class="text-center">
            <b-button class="btn-primary modal-default-button" @click="$emit('close')">
              Hvala
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  props: {
    size: {
      type: Number,
      default: 200
    },
    url: String
  },
  components: {
    QrcodeVue,
  },
  methods: {
    onClickOutside() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 10px 0 20px 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container .modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
