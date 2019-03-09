const colors = require('colors')
const pug = require('./main')

pug().catch(err => {
  console.error(colors.red(err))
})
