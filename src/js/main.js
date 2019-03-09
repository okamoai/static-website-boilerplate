import 'es6-promise/auto'
import axios from 'axios'
import get from 'lodash-es/get'

const button = document.getElementById('getUser')
const resultUser = document.getElementById('resultUser')

button.addEventListener('click', async () => {
  resultUser.innerHTML = '<p>Loading....</p>'
  const response = await axios.get('https://randomuser.me/api/')
  const [result] = get(response, 'data.results', [])
  const src = get(result, 'picture.medium', '/resources/img/noimage.png')
  const fisrtName = get(result, 'name.first', '')
  const lastName = get(result, 'name.last', '')
  resultUser.innerHTML = `
    <p>
      <img src="${src}" alt="">
      ${fisrtName} ${lastName}
    </p>
  `
})
