const h = require('../lib/h')
const { div, a } = require('../lib/h')
const block = h('.block')
const button = h('a.button')
button.blue = button.extend('.is-info')
button.green = button.extend('.is-success')
button.red = button.extend('.is-danger')
button.yellow = button.extend('.is-warning')

module.exports = button