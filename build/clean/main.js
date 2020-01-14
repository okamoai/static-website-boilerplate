const rimraf = require('rimraf')
const colors = require('colors')
const { distPath } = require('../config')

module.exports = () =>
  new Promise((resolve, reject) => {
    rimraf(distPath, err => {
      if (err) {
        reject(new Error(err))
        return
      }
      console.log(colors.cyan('"Clean:" delete files ...'))
      resolve()
    })
  })
