const path = require('path')
const colors = require('colors')
const webpack = require('webpack')
const { rootPath, js: config } = require('../config')

process.env.NODE_ENV = process.argv[2] || 'development'
const isDevelopment = process.env.NODE_ENV === 'development'

const compiler = webpack({
  mode: process.env.NODE_ENV,
  devtool: isDevelopment ? 'inline-source-map' : false,
  context: config.inputDir,
  entry: config.entries,
  output: {
    path: config.outputDir,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
})

const getError = err => {
  if (err) {
    if (err.details) {
      return new Error(err.details)
    }
    return new Error(err.stack || err)
  }
  return false
}

const getStatsError = stats => {
  const info = stats.toJson()
  if (stats.hasErrors()) {
    return new Error(info.errors)
  }
  if (stats.hasWarnings()) {
    info.warnings.forEach(warn => console.warn(warn))
  }
  const output = path.relative(rootPath, info.outputPath)
  info.assets.forEach(asset => {
    console.log(colors.green(' bundled JS file: ') + path.join(output, asset.name))
  })
  return false
}

async function build() {
  console.log(colors.cyan('"Build:js": output javascript files ...'))
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      const error = getError(err)
      if (error) {
        reject(error)
        return
      }
      const statsError = getStatsError(stats)
      if (statsError) {
        reject(statsError)
        return
      }
      resolve()
    })
  })
}

async function watch() {
  console.log(colors.cyan('"Watch:js": watching files ...'))
  compiler.hooks.failed.tap('failed', err => {
    const error = getError(err)
    if (error) {
      console.error(colors.red(error))
    }
  })
  compiler.hooks.done.tap('done', stats => {
    const error = getStatsError(stats)
    if (error) {
      console.error(colors.red(error))
    }
  })
  compiler.watch(
    {
      watchOptions: {
        ignored: /node_modules/,
      },
    },
    () => {}
  )
}
module.exports = async (opt = { watch: false }) => {
  try {
    if (opt.watch) {
      await watch()
    } else {
      await build()
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}
