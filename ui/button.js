const h = require('../lib/h')
const { div, a } = require('../lib/h')
const block = h('.block')
const button = h('a.button')
const blue = button.extend('.is-info')
const green = button.extend('.is-success')
const red = button.extend('.is-danger')
const yellow = button.extend('.is-warning')



module.exports = content => blue(content)