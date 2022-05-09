export default {
  server: {
    host: '0.0.0.0',
    port: 3000
  },

  env: {
    apiUrl: process.env.apiUrl || 'http://localhost:4400'
    // apiUrl: process.env.apiUrl || 'http://192.168.34.217:4400'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Pesmomat',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/click-outside.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/toast',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  axios: {
    https: false,
    // baseURL: process.env.base_url || 'http://192.168.34.217:4400'
    baseURL: process.env.base_url || 'http://localhost:4400'
  },

  toast: {
    position: 'top-right',
  }

}
