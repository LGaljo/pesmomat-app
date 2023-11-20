export default {
  server: {
    host: process.env.APP_URL,
    port: process.env.APP_PORT
  },

  ssr: false,

  loading: false,

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL,
      baseURL: process.env.API_URL
    },
    API_URL: process.env.API_URL,
    ENABLE_GENERATE: process.env.ENABLE_GENERATE,
    ENABLE_STATS: process.env.ENABLE_STATS,
    BROWSE_TIMEOUT: Number(process.env.BROWSE_TIMEOUT) || 180000,
    ADMIN: Boolean(process.env.ADMIN),
    ENV: process.env.ENV,
    SLIDESHOW_INTERVAL: Number(process.env.SLIDESHOW_INTERVAL) || 10000,
    COIN_INTERVAL: Number(process.env.COIN_INTERVAL) || 10000
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
          '@/assets/Oblik Bold.otf'
      },
      {
        rel: 'stylesheet',
        href:
          '@/assets/fonts/ARVO-REGULAR.TTF'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/scss/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/init.js', ssr: false},
    '~/plugins/click-outside.js',
    '~/plugins/axios.js',
    '~/plugins/veevalidate.js',
    '~/plugins/eventbus.js',
    '~/plugins/touch-event.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts'
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
    extractCSS: false, // true causes duplicate css
    splitChunks: {
      layouts: true
    },
    extend(config, ctx) {}
  },

  axios: {
    https: false,
    // baseURL: process.env.base_url || 'http://192.168.34.217:4400'
    // baseURL: process.env.API_URL || 'http://localhost:4400'
    // baseURL: process.env.API_URL
  },

  toast: {
    position: 'top-right'
  },

  googleFonts: {
    download: true,
    base64: true,
    inject: true,
    fontsDir: '~/assets/fonts',
    families: {
      // Arvo: true,
      'Playfair Display': true
    }
  }
}
