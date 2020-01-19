const path = require('path')
const colors = require('colors')
const chokidar = require('chokidar')
const stylus = require('stylus')
const postcss = require('postcss')
const postcssrc = require('postcss-load-config')
const emitty = require('emitty')
const { rootPath, css: config } = require('../config')
const { toGlobPattern, readPath, mkdir, readFile, writeFile } = require('../utils')

process.env.NODE_ENV = process.argv[2] || 'development'
const isDevelopment = process.env.NODE_ENV === 'development'

async function compileStylus(file) {
  const input = config.inputDir.replace(/\\/g, '/') // for Windows
  const str = await readFile(file)
  return new Promise((resolve, reject) => {
    stylus(str)
      .set('filename', file)
      .set('include css', true)
      .set('sourcemap', isDevelopment ? { inline: true } : false)
      .include(input)
      .render((err, css) => {
        if (err) {
          reject(new Error(err))
          return
        }
        resolve(css)
      })
  })
}

async function compilePostCss(css, from, to) {
  return new Promise((resolve, reject) => {
    postcssrc()
      .then(({ plugins, options }) => {
        postcss(plugins)
          .process(css, { from, to, ...options })
          .then(result => resolve(result.css))
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
  })
}

async function outputCss(file) {
  const basename = path.basename(file, '.styl')
  const outputFileName = `${basename}.css`
  const relativePath = path.relative(config.inputDir, path.dirname(file))
  const output = path.join(config.outputDir, relativePath, outputFileName)
  try {
    const precss = await compileStylus(file)
    const css = await compilePostCss(precss, file, output)
    await mkdir(output)
    await writeFile(output, css)
    console.log(colors.green(' compile stylus file: ') + path.relative(rootPath, output))
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function watch(input) {
  console.log(colors.cyan('"Watch:css": watching files ...'))
  const emittyStylus = emitty.setup(config.inputDir, 'stylus', { basedir: config.inputDir })
  await emittyStylus.scan()
  const chokidarInput = input.replace(/\\/g, '/') // for Windows
  const watcher = chokidar.watch(chokidarInput, {
    ignoreInitial: true,
  })
  watcher.on('all', async (event, file) => {
    if (event === 'add' || event === 'unlink') {
      await emittyStylus.scan().catch(err => {
        throw new Error(err)
      })
    }
    if (new RegExp(`${path.sep}_`).test(file) === false) {
      outputCss(file).catch(err => {
        throw new Error(err)
      })
    } else {
      const storage = emittyStylus.storage()
      const dependencyOutput = targetPath => {
        const filePath = targetPath.replace(/\\/g, '/') // for Windows
        Object.keys(storage)
          .filter(key =>
            storage[key].dependencies.some(dep =>
              new RegExp(dep.replace('*', '.+?')).test(filePath)
            )
          )
          .forEach(key => {
            if (new RegExp('/_').test(key) === false) {
              outputCss(path.join(rootPath, key)).catch(err => {
                throw new Error(err)
              })
            } else {
              dependencyOutput(path.join(rootPath, key))
            }
          })
      }
      dependencyOutput(file)
    }
  })
}

async function build(input) {
  console.log(colors.cyan('"Build:css": output CSS files ...'))
  try {
    const files = await readPath(input)
    const taskAll = files
      .filter(file => new RegExp(`${path.sep}_`).test(file) === false)
      .map(file => outputCss(file))
    return Promise.all(taskAll)
  } catch (err) {
    console.error(err)
    throw err
  }
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
