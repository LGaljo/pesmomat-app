module.exports = {
  APP_URL: '0.0.0.0',
  APP_PORT: process.env.PORT,
  API_URL: process.env.API_URL || 'http://localhost:4400',
  BROWSE_TIMEOUT: 3 * 60 * 1000,
  ADMIN: process.env.ADMIN || false,
  API_TOKEN: 'none'
}
