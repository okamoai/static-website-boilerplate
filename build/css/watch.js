const colors = require('colors')
const css = require('./main')

css({ watch: true }).catch(err => {
  console.error(colors.red(err))
})
