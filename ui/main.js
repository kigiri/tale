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
const tag = require('~/ui/elements/tag')
const title = require('~/ui/elements/title')

module.exports = state => app([
  nav(state),
  tableForm(state),
  msg({
    author: 'Super martine',
    content: `Ceci est un superbe message\noh qu'il est beau`,
    createdAt: 1486302011377,
  }, state),
  btn.blue('OK'),
  btn.red('NO'),
  tag('test'),
  title('PETIT TITRE'),
])
