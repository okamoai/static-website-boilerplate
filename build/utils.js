const fs = require('fs')
const path = require('path')
const glob = require('glob')
const mkdirp = require('mkdirp')

module.exports = {
  toGlobPattern(entries) {
    if (Array.isArray(entries) && entries.length === 0) {
      throw new Error('no entries')
    }
    return entries.length > 1 ? `{${entries.join(',')}}` : entries[0]
  },
  readPath(pattern, opt = { target: 'all' }) {
    return new Promise((resolve, reject) => {
      glob(pattern, (err, files) => {
        if (err) {
          reject(new Error(err))
          return
        }
        let fileList = files.map(file => path.normalize(file))
        switch (opt.target) {
          case 'file':
            fileList = files.filter(file => fs.statSync(file).isFile())
            break
          case 'directory':
            fileList = files.filter(file => fs.statSync(file).isDirectory())
            break
          default:
        }
        resolve(fileList)
      })
    })
  },
  readFile(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, body) => {
        if (err) {
          reject(new Error(err))
          return
        }
        resolve(body)
      })
    })
  },
  writeFile(file, body) {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, body, err => {
        if (err) {
          reject(new Error(err))
          return
        }
        resolve()
      })
    })
  },
  mkdir(file) {
    const dir = path.dirname(file)
    return mkdirp(dir)
  },
}
