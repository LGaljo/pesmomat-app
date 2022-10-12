export default {
  defaultLocale: 'sl',
  // parsePages: false,
  // langDir: 'locales/',
  // lazy: true,
  locales: ['sl', 'en'],
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      sl: {
        actions: {
          search: 'Išči'
        }
      },
      en: {
        actions: {
          search: 'Search'
        }
      }
      // sl: require('../locales/sl.json'),
      // en: require('../locales/en.json')
    }
  }
}
