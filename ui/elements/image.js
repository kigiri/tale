const h = require('../../lib/h')
const { figure, img } = require('../../lib/h')
const fig = h('.image')
fig.small = fig.extend('.is-64x64')
fig.medium = fig.extend('.is-96x96')
fig.big = fig.extend('.is-128x128')

module.exports = fig.big(img)

// http://bulma.io/documentation/elements/image/