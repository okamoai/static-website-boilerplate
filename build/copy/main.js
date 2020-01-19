const cpx = require('cpx')
const path = require('path')
const colors = require('colors')
const { copy: config } = require('../config')
const { toGlobPattern } = require('../utils')

async function build(input) {
  console.log(colors.cyan('"Build:copy": copy files ...'))
  return new Promise((resolve, reject) => {
    cpx
      .copy(input, config.outputDir, err => {
        if (err) {
          reject(new Error(err))
          return
        }
        resolve()
      })
      .on('copy', ({ dstPath }) => {
        console.log(colors.green(' copy file: ') + dstPath)
      })
  })
}

async function watch(input) {
  console.log(colors.cyan('"Watch:copy": watching files ...'))
  return new Promise((resolve, reject) => {
    cpx
      .watch(input, config.outputDir, { initialCopy: false }, err => {
        if (err) {
          reject(new Error(err))
          return
        }
        resolve()
      })
      .on('copy', ({ dstPath }) => {
        console.log(colors.green(' copy file: ') + dstPath)
      })
  })
}

module.exports = async (opt = { watch: false }) => {
  try {
    const globPattern = toGlobPattern(config.entries)
    const input = path.join(config.inputDir, globPattern)
    if (opt.watch) {
      await watch(input)
    } else {
      await build(input)
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}
