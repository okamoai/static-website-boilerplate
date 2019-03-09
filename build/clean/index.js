const colors = require('colors')
const clean = require('./main')

clean().catch(err => {
  console.error(colors.red(err))
})
