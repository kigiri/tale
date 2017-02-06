const { label, h, select, option } = require('../lib/h')
const db = require('../data/db')
const each = require('izi/collection/each')
const map = require('izi/collection/map')
const section = h('.section')
const container = h('.container')
const locale = require('../data/locale')
const hr = h('hr')()
const title = h('.title')
const input = require('./input')
const i18n = require('../i18n')

const pouet = map.toArr((data, field) => (data.locked || data.auto) || input({
  name: (data.locale && data.locale[locale()]) || field,
  values: data.values,
  placeholder: data.exemple && data.exemple[locale()],
  type: data.type,
  id: data.id,
}, data.obs))

module.exports = state => {
  const tableKey = state.route
  const table = db[tableKey]

  if (!table) return `Table '${tableKey}' not found`

  return section(container([
    title(table.name[state.locale]),
    hr,
    pouet(table),
    h.button({
      onclick: () => locale.set(Number(!locale()))
    }, 'change locale')
  ]))
}
