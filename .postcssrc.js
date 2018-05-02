// https://github.com/michael-ciniawsky/postcss-load-config

const path = require('path')

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-mpvue-wxss': {},
    'postcss-cssnext': {},
    'postcss-nested': {},
    cssnano: {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false
    }
  }
}
