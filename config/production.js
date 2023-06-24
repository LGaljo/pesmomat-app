module.exports = {
  ENV: 'production',
  APP_URL: '0.0.0.0',
  APP_PORT: 4000,
  API_URL: process.env.API_URL || 'http://rainbow.fri.uni-lj.si:4400/',
  BROWSE_TIMEOUT: 3 * 60 * 1000,
  ADMIN: true,
  API_TOKEN: 'none',
  SLIDESHOW_INTERVAL: 1000 * 30, // 30 sekund
  COIN_INTERVAL: 10000,
}
