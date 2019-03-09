const colors = require('colors')
const img = require('./main')

img({ watch: true }).catch(err => {
  console.error(colors.red(err))
})
