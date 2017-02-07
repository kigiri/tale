const h = require('../lib/h')
const { span, button } = require('../lib/h')
const tag = h('span.tag')
tag.medium = tag.extend('.is medium')
tag.large = tag.extend('.is large')
const del = h('button.delete')
del.small = del.extend('.is-small')
del.medium = del.extend('.is-medium')
del.large = del.extend('.is-large')

module.exports = txt => tag(txt)

// http://bulma.io/documentation/elements/tag/