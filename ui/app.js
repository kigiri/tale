const h = require('../lib/h')

const app = h('#app', {
  style: {
    backgroundColor: '#bada55',
    color: 'white',

  }
})

let content = 'lol'

module.exports = state => app(content)