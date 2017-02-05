const h = require('../lib/h')
const nav = h('nav.nav.has-shadow')
const container = h('.container')
const navLeft = h('.nav-left')
const navRight = h('.nav-right.nav-menu')
const navItem = h('a.nav-item')
const navTab = navItem.extend('.is-tab')
const navTabHideMobile = navTab.extend('.is-hidden-mobile')
const navTabHideTablet = navTab.extend('.is-hidden-tablet')
const navToggle = h('span.nav-toggle')
const image = h('figure.image.is-16x16', { style: { marginRight: 8 } })
const db = require('../data/db')
const fields = Object.keys(db)

module.exports = state => nav(container([
  navLeft([
/*    navItem(h.img({
      src: 'http://bulma.io/images/bulma-logo.png',
      alt: 'Bulma Logo'
    })), */
    ...fields.map(name => navTab({
      href: `/#/${name}`,
      className: state.route === name
        ? 'is-active'
        : undefined,
    }, name[0].toUpperCase() + name.slice(1)))
  ]),
  navRight([
    navTab([
      image(h.img({ src: 'http://bulma.io/images/jgthms.png' })),
      'Profile',
    ]),
    navTab('Log out')
  ]),
]))

