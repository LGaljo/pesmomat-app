import Vue from 'vue';

export default function({ app }) {
  app.$eventBus = new Vue();
  Vue.prototype.$eventBus = app.$eventBus;
}
