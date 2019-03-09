const colors = require('colors')
const js = require('./main')

js().catch(err => {
  console.error(colors.red(err))
})
