const h = require('../lib/h')
const map = require('izi/collection/map')
const tableForm = require('./table-form')

const app = h('#app', {
  style: {
    backgroundColor: '#bada55',
    color: 'black',
    fontFamily: 'monospace',
    fontSize: '8px'
  }
})

module.exports = state => app(tableForm('topics', state))
