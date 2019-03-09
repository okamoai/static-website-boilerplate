const colors = require('colors')
const copy = require('./main')

copy().catch(err => {
  console.error(colors.red(err))
})
