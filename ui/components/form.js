const h = require('../../lib/h')
const { div, ul, li, a, span } = require('../../lib/h')
const dc = h('div.tabs.is-centered.is-toggle')
const ali = h('li.is-active')

module.exports = contenu => dc(ul(ali(a(span(contenu)))))

// http://bulma.io/documentation/components/tabs/