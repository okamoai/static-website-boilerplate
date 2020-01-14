# Static Website Boilerplate

Website bolierplate for HTML/CSS/JS/WebFont/CSSSprite.

[![Node.js version support][shield-node]](#)
[![NPM version][shield-npm]](#)
[![MIT licensed][shield-license]](#)

## Table of Contents

- [Requirements](#requirements)
- [Get Started](#get-started)
- [Generators](#generators)
- [Usage](#usage)
- [Setting](#setting)
- [License](#license)

## Requirements

Requires the following to run:

- node 12.14+
- npm 6.13+

I checked the operation with Windows 10 / MacOS 10.12.

## Get Started

1.Clone the Git repository

```sh
git clone https://github.com/okamoai/static-website-boilerplate.git
```

2.Move to project directory

```sh
cd static-website-boilerplate
```

3.Install Node.js package

```sh
npm install
```

4.Start Development (run build and local server)

```sh
npm start
```

## Generators

Build source files

| Type               | Generator                                                              | Path         |
| ------------------ | ---------------------------------------------------------------------- | ------------ |
| HTML               | [Pug](https://pugjs.org/)                                              | `src/pug`    |
| CSS                | [Stylus](http://stylus-lang.com/), [PostCSS](https://postcss.org/)     | `src/stylus` |
| JavaScript         | [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/)       | `src/js`     |
| Image              | [imagemin](https://github.com/imagemin/imagemin)                       | `src/img`    |
| WebFont            | [postcss-webfont(forked)](https://github.com/okamoai/postcss-webfont)  | `src/font`   |
| Sprite             | [postcss-lazysprite](https://www.npmjs.com/package/postcss-lazysprite) | `src/sprite` |
| Other static files | [cpx](https://www.npmjs.com/package/cpx)                               | `src/static` |

## Usage

- Development is npm scripts `npm start`. Run clean, build, watching and local Server.
- Production build is npm scripts `npm run build production`. Run clean and minify build.

## Setting

| File                | use type             | use package and options                                                                                                                                                                                                                                                                                                                                                       |
| ------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.browserslistrc`   | CSS, JavaScript      | [postcss-preset-env](https://preset-env.cssdb.org/), [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)                                                                                                                                                                                                                                                         |
| `postcss.config.js` | CSS, WebFont, Sprite | [cssnano](https://cssnano.co/guides/optimisations), [postcss-webfont](https://github.com/okamoai/postcss-webfont#options), [postcss-lazysprite](https://www.npmjs.com/package/postcss-lazysprite#options)                                                                                                                                                                     |
| `build/config.js`   | JavaScript, Image    | [Webpack](https://webpack.js.org/concepts/entry-points#multi-page-application), imagemin plugins ([gifsicle](https://www.npmjs.com/package/imagemin-gifsicle#options), [pngquant](https://www.npmjs.com/package/imagemin-pngquant#options), [jpegtran](https://www.npmjs.com/package/imagemin-jpegtran#options), [svgo](https://www.npmjs.com/package/imagemin-svgo#options)) |

## License

MIT © [okamoai](https://github.com/okamoai)

[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/badge/node.js-10.14.1-brightgreen.svg
[shield-npm]: https://img.shields.io/badge/npm-v6.4.1-blue.svg
