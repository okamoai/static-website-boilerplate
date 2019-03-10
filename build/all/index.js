const clean = require('../clean/main')
const copy = require('../copy/main')
const html = require('../html/main')
const js = require('../js/main')
const css = require('../css/main')
const img = require('../img/main')

const run = async () => {
  await clean()
  await copy()
  await html()
  await js()
  await css()
  await img()
}
run().catch(err => {
  console.error(err)
})
