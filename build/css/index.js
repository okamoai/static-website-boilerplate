const colors = require('colors')
const css = require('./main')

css().catch(err => {
  console.error(colors.red(err))
})
