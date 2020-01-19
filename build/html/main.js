const path = require('path')
const colors = require('colors')
const chokidar = require('chokidar')
const pug = require('pug')
const emitty = require('emitty')
const { rootPath, html: config } = require('../config')
const { toGlobPattern, readPath, writeFile, mkdir } = require('../utils')

function compilePug(file) {
  const html = pug.renderFile(file, {
    basedir: config.inputDir,
    pretty: config.pretty,
  })
  return html
}

async function outputHtml(file) {
  const basename = path.basename(file, '.pug')
  const outputFileName = path.extname(basename) ? basename : `${basename}.html`
  const relativePath = path.relative(config.inputDir, path.dirname(file))
  const output = path.join(config.outputDir, relativePath, outputFileName)
  try {
    const html = compilePug(file)
    await mkdir(output)
    await writeFile(output, html)
    console.log(colors.green(' compile pug file: ') + path.relative(rootPath, output))
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function watch(input) {
  console.log(colors.cyan('"Watch:html": watching files ...'))
  const emittyPug = emitty.setup(config.inputDir, 'pug', { basedir: config.inputDir })
  await emittyPug.scan().catch(err => {
    throw new Error(err)
  })
  const chokidarInput = input.replace(/\\/g, '/') // for Windows
  const watcher = chokidar.watch(chokidarInput, {
    ignoreInitial: true,
  })
  watcher.on('all', async (event, file) => {
    if (event === 'add' || event === 'unlink') {
      await emittyPug.scan().catch(err => {
        throw new Error(err)
      })
    }
    if (new RegExp(`${path.sep}_`).test(file) === false) {
      outputHtml(file).catch(err => {
        throw new Error(err)
      })
    } else {
      const storage = emittyPug.storage()
      const dependencyOutput = targetPath => {
        const filePath = targetPath.replace(/\\/g, '/') // for Windows
        Object.keys(storage)
          .filter(key => storage[key].dependencies.includes(filePath))
          .forEach(async key => {
            if (new RegExp('/_').test(key) === false) {
              outputHtml(path.join(rootPath, key)).catch(err => {
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
  console.log(colors.cyan('"Build:html": output HTML files ...'))
  try {
    const files = await readPath(input)
    const taskAll = files
      .filter(file => new RegExp(`${path.sep}_`).test(file) === false)
      .map(file => outputHtml(file))
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
