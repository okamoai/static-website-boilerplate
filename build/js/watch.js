const colors = require('colors')
const js = require('./main')

js({ watch: true }).catch(err => {
  console.error(colors.red(err))
})
