const colors = require('colors')
const copy = require('./main')

copy({ watch: true }).catch(err => {
  console.error(colors.red(err))
})
