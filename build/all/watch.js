const copy = require('../copy/main')
const html = require('../html/main')
const js = require('../js/main')
const css = require('../css/main')
const img = require('../img/main')

const run = async () => {
  copy({ watch: true })
  html({ watch: true })
  js({ watch: true })
  css({ watch: true })
  img({ watch: true })
}
run().catch(err => {
  console.error(err)
})
