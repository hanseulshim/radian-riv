/* eslint-disable */
const isAlpha = process.env.NODE_ENV === 'alpha'
const isBeta = process.env.NODE_ENV === 'beta'

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isAlpha
    ? 'https://alpha.boostlabs.com/radian-riv'
    : isBeta
    ? 'https://beta.boostlabs.com/radian-riv'
    : '',
  basePath: isAlpha || isBeta ? '/radian-riv' : '',
  env: {
    baseUrl: isAlpha || isBeta ? '/radian-riv' : ''
  }
}
