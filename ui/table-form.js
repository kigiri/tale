const h = require('~/lib/h')
const db = require('~/data/db')
const map = require('izi/collection/map')
const input = require('~/ui/input')
const locale = require('~/data/locale')
const tableNames = require(`~/data/table-names`)
const button = require('~/ui/button')
const section = h('.section')
const container = h('.container')
const hr = h('hr')()
const title = h('.title')

const pouet = map.toArr((data, field) => (data.locked || data.auto) || input({
  name: data.locale(),
  values: data.values,
  placeholder: data.exemple && data.exemple(),
  type: data.type,
  id: data.id,
}, data.obs))

module.exports = state => {
  const tableKey = state.route
  const table = db[tableKey]
  const name = tableNames[tableKey]

  if (!table) return `Table '${tableKey}' not found`

  return section(container([
    title(name[state.locale]),
    hr,
    pouet(table),
    button({
      onclick: () => locale.set(Number(!locale()))
    }, 'change locale')
  ]))
}
