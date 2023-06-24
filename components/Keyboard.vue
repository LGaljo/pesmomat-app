<template>
  <div v-show="keyboardVisible" class="position-absolute w-100" style="bottom: 0; left: 0; z-index: 2000">
    <div class="simple-keyboard"></div>
  </div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "Keyboard",
  data: () => ({
    keyboardVisible: false,
    keyboard: null,
  }),
  props: {
    pagetype: {
      type: String,
      default: 'default'
    }
  },
  mounted() {
    this.$eventBus.$on('keyboard', this.keyboardSet)
    this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layout: {
        default: [
          "1 2 3 4 5 6 7 8 9 0 {bksp}",
          "q w e r t z u i o p š đ",
          "a s d f g h j k l č ć ž",
          "y x c v b n m , . -",
          "{lock} {space} {enter}"
        ],
        capitalize: [
          "1 2 3 4 5 6 7 8 9 0 {bksp}",
          "Q W E R T Z U I O P Š Đ",
          "A S D F G H J K L Č Ć Ž",
          "Y X C V B N M , . -",
          "{lock} {space} {enter}"
        ]
      },
      theme: `hg-theme-default hg-layout-default ${this.pagetype === 'default' ? "defaultTheme" : "generateTheme"}`,
      buttonTheme: [
        {
          class: this.pagetype === 'default' ? "hg-default" : "hg-generate",
          buttons: "1 2 3 4 5 6 7 8 9 0 {bksp} q w e r t z u" +
            " i o p š đ {lock} a s d f g h j k l č ć ž {enter} " +
            "y x c v b n m Q W E R T Z U I O P Š Đ A S D F G H " +
            "J K L Č Ć Ž Y X C V B N M , . - {space}"
        },
      ],
      display: {
        '{bksp}': 'BRIŠI',
        '{enter}': 'ENTER',
        '{lock}': 'Aa',
        '{space}': 'PRESLEDEK',
      }
    }, {
      newLineOnEnter: false,
    });
  },
  methods: {
    onChange(input) {
      this.$eventBus.$emit('keyinput', input)
      this.input = input;
    },
    onKeyPress(button) {
      if (button === '{lock}') {
        let currentLayout = this.keyboard.options.layoutName;
        this.keyboard.setOptions({
          layoutName: currentLayout === "default" ? "capitalize" : "default"
        });
        return;
      }
      this.$eventBus.$emit('keypress', button)
    },
    keyboardSet(visibility) {
      this.keyboard.clearInput()
      this.keyboardVisible = visibility
    }
  }
}

</script>

<style lang="scss">
@import "scss/custom";

.simple-keyboard {
  max-width: 100%;
}

// Default
.simple-keyboard.hg-theme-default.defaultTheme {
  background: map-get($default-colours, 'kb_bg');
  border-radius: 0;
}

.simple-keyboard.hg-layout-default,
.hg-button.hg-default {
  background: map-get($default-colours, 'kb_btn');
  color: map-get($default-colours, 'kb_text');
  font-family: MAGIONA_DISPLAY, serif;
  font-size: 1.5rem;
}

.simple-keyboard.hg-layout-default,
.hg-button.hg-default:active {
  background: map-get($default-colours, 'kb_text');
  color: map-get($default-colours, 'kb_btn');
}

// Generate
.simple-keyboard.hg-theme-default.generateTheme {
  background: map-get($generate-colours, 'kb_bg');
  border-radius: 0;
}

.simple-keyboard.hg-layout-default,
.hg-button.hg-generate {
  background: map-get($generate-colours, 'kb_btn');
  color: map-get($generate-colours, 'kb_text');
  font-family: MAGIONA_DISPLAY, serif;
  font-size: 1.5rem;
}

.simple-keyboard.hg-layout-default,
.hg-button.hg-generate:active {
  background: map-get($generate-colours, 'kb_text');
  color: map-get($generate-colours, 'kb_btn');
}

</style>
