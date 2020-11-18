/* eslint-disable */
const isAlpha = process.env.NODE_ENV === 'alpha'

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isAlpha ? 'https://alpha.boostlabs.com/radian-riv' : '',
  basePath: isAlpha ? '/radian-riv' : '',
  env: {
    baseUrl: isAlpha ? '/radian-riv' : ''
  }
}
