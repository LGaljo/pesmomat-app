module.exports = {
  ENV: 'production',
  APP_URL: '0.0.0.0',
  APP_PORT: process.env.PORT,
  API_URL: process.env.API_URL || 'http://localhost:4400',
  BROWSE_TIMEOUT: 3 * 60 * 1000,
  ADMIN: true,
  API_TOKEN: 'none',
  SLIDESHOW_INTERVAL: 1000 * 30, // 30 sekund
}
