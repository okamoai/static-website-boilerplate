const path = require('path')
const colors = require('colors')
const chokidar = require('chokidar')
const imagemin = require('imagemin')
const imageminGifsicle = require('imagemin-gifsicle')
const imageminPngquant = require('imagemin-pngquant')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminSvgo = require('imagemin-svgo')
const { rootPath, img: config } = require('../config')
const { toGlobPattern, readPath } = require('../utils')

function outputImage(filePath) {
  const relativePath = path.relative(config.inputDir, filePath)
  const output = path.join(config.outputDir, relativePath)
  return imagemin([filePath.replace(/\\/g, '/')], {
    destination: path.dirname(output),
    plugins: [
      imageminGifsicle(config.plugins.gif),
      imageminJpegtran(config.plugins.jpg),
      imageminPngquant(config.plugins.png),
      imageminSvgo(config.plugins.svg),
    ],
  }).then(files => {
    files.forEach(file => {
      console.log(
        colors.green(' minify image file: ') + path.relative(rootPath, file.destinationPath)
      )
    })
  })
}

async function watch(input) {
  console.log(colors.cyan('"Watch:img": watching files ...'))
  const chokidarInput = input.replace(/\\/g, '/') // for Windows
  const watcher = chokidar.watch(chokidarInput, {
    ignoreInitial: true,
  })
  watcher.on('all', (event, file) => {
    if (event === 'add' || event === 'change') {
      outputImage(file)
    }
  })
}

async function build(input) {
  console.log(colors.cyan('"Build:img": output compressed image files ...'))
  const files = await readPath(input)
  const taskAll = files.map(file => outputImage(file))
  return Promise.all(taskAll)
}

module.exports = async (opt = { watch: false }) => {
  const globPattern = toGlobPattern(config.entries)
  const input = path.join(config.inputDir, globPattern)

  if (opt.watch) {
    watch(input)
  } else {
    build(input)
  }
}
