const h = require('../lib/h')
const map = require('izi/collection/map')
const tableForm = require('./table-form')
const nav = require('./nav')

const app = h('#app', {
  style: {
    //fontFamily: 'monospace',
  }
})


// j'importe mon element
const msg = require('./message-exemple')
const btn = require('./button')

module.exports = state => app([
  nav(state),
  tableForm(state),
  msg({
    author: 'Super martine',
    content: `Ceci est un superbe message\noh qu'il est beau`,
    createdAt: 1486302011377,
  }, state),
  btn('OK')
])
