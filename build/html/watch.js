const colors = require('colors')
const pug = require('./main')

pug({ watch: true }).catch(err => {
  console.error(colors.red(err))
})
