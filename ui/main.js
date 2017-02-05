const h = require('../lib/h')
const map = require('izi/collection/map')
const tableForm = require('./table-form')
const nav = require('./nav')

const app = h('#app', {
})

module.exports = state => app([
  nav(state),
  tableForm(state),
])
