module.exports = {
  ENV: 'development',
  APP_URL: 'localhost',
  APP_PORT: 3000,
  API_URL: process.env.API_URL || 'http://localhost:4400',
  BROWSE_TIMEOUT: 3 * 60 * 1000,
  ADMIN: true,
  API_TOKEN: 'none',
  SLIDESHOW_INTERVAL: 1000 * 30, // 30 sekund
}
