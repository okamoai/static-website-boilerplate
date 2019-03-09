const colors = require('colors')
const img = require('./main')

img().catch(err => {
  console.error(colors.red(err))
})
