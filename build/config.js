const path = require('path')

const rootPath = process.cwd()
const distPath = path.join(rootPath, 'dist')
const srcPath = path.join(rootPath, 'src')

module.exports = {
  rootPath,
  distPath,
  srcPath,
  copy: {
    inputDir: path.join(srcPath, 'static'),
    outputDir: distPath,
    entries: [
      // Can use minimatch format
      '**/*',
    ],
  },
  html: {
    inputDir: path.join(srcPath, 'pug'),
    outputDir: distPath,
    entries: [
      // Can use minimatch format
      '**/*.pug',
    ],
    pretty: true,
  },
  img: {
    inputDir: path.join(srcPath, 'img'),
    outputDir: path.join(distPath, 'resources/img'),
    entries: [
      // Can use minimatch format
      '**/*.{gif,jpg,png,svg}',
    ],
    plugins: {
      gif: {},
      jpg: {},
      png: { quality: [0.65, 0.8] },
      svg: {
        plugins: [
          { removeRasterImages: true },
          { cleanupListOfValues: true },
          { sortAttrs: true },
          { removeUselessStrokeAndFill: true },
          { convertPathData: false },
          { removeTitle: true },
          { removeDesc: true },
        ],
      },
    },
  },
  js: {
    inputDir: path.join(srcPath, 'js'),
    outputDir: path.join(distPath, 'resources/js'),
    // Same webpack option multiple entry
    entries: {
      app: './main.js',
    },
  },
  css: {
    inputDir: path.join(srcPath, 'stylus'),
    outputDir: path.join(distPath, 'resources/css'),
    entries: [
      // Can use minimatch format
      '**/*.styl',
    ],
  },
  font: {
    inputDir: path.join(srcPath, 'font'),
    outputDir: path.join(distPath, 'resources/font'),
  },
  sprite: {
    inputDir: path.join(srcPath, 'sprite'),
    outputDir: path.join(distPath, 'resources/img'),
  },
}
