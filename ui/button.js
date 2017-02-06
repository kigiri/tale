const h = require('../lib/h')
const store = require('izi/collection/store')
const toKey = str => str.slice(str.indexOf('-'))

module.exports = store((btn, className, key) =>
  btn[toKey(className)] = btn[key] = btn.extend(className), {
    red: '.is-danger',
    blue: '.is-info',
    green: '.is-success',
    yellow: '.is-warning',
  }, h('a.button'))