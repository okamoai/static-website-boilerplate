const { css, font, sprite } = require('./build/config')

module.exports = ctx => ({
  map: ctx.env === 'development' ? { inline: true } : false,
  plugins: {
    'postcss-preset-env': {
      autoprefixer: { grid: true },
    },
    'postcss-easings': true,
    'css-mqpacker': true,
    'postcss-lazysprite': {
      imagePath: sprite.inputDir,
      stylesheetInput: css.inputDir,
      stylesheetRelative: css.outputDir,
      spritePath: sprite.outputDir,
      nameSpace: 'c-sprite-',
      cssSeparator: '.-',
      outputExtralCSS: true,
    },
    'postcss-webfont': {
      basePath: font.inputDir,
      stylesheetPath: css.outputDir,
      outputPath: font.outputDir,
      formats: ['woff2', 'woff', 'ttf'],
      startUnicode: 0xf000,
      normalize: true,
      fontHeight: 500,
      classNamePrefix: 'c-webfont',
      classNamePrefixBefore: false,
      classNamePrefixAfter: false,
      classNameGlyphSeparator: '.-',
    },
    'postcss-sorting': true,
    cssnano:
      ctx.env === 'development'
        ? false
        : {
            minifyFontValues: { removeQuotes: false },
            discardUnused: { fontFace: false },
            zindex: false,
            reduceIdents: false,
          },
  },
})
