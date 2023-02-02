const CONFIG = require(`./config/${process.env.ENV}.js`)
const locale = require('./config/locale')

export default {
  server: {
    host: CONFIG.APP_URL,
    port: CONFIG.APP_PORT
  },

  ssr: false,

  loading: false,

  env: {
    API_URL: CONFIG.API_URL,
    API_TOKEN: CONFIG.API_TOKEN,
    BROWSE_TIMEOUT: Number(CONFIG.BROWSE_TIMEOUT),
    ADMIN: Boolean(CONFIG.ADMIN),
    ENV: CONFIG.ENV,
    SLIDESHOW_INTERVAL: Number(CONFIG.SLIDESHOW_INTERVAL) || 10000,
    COIN_INTERVAL: Number(CONFIG.COIN_INTERVAL) || 10000,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Pesmomat',
    htmlAttrs: {
      lang: 'sl'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          '@/assets/Oblik Font.otf'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/click-outside.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  router: {
    middleware: [
      'auth'
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/toast',
    '@nuxtjs/i18n'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  i18n: {
    defaultLocale: 'sl',
    parsePages: false,
    // langDir: 'locales/',
    // lazy: true,
    locales: ['sl', 'en'],
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        sl: require('./locales/sl.json'),
        en: require('./locales/en.json')
      }
    }
  },

  axios: {
    https: false,
    // baseURL: process.env.base_url || 'http://192.168.34.217:4400'
    baseURL: CONFIG.API_URL || 'http://localhost:4400'
  },

  toast: {
    position: 'top-right',
  }

}
