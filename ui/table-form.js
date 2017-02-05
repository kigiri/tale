const { h, label, select, option } = require('../lib/h')
const db = require('../data/db')
const each = require('izi/collection/each')
const map = require('izi/collection/map')
const store = require('izi/collection/store')
const container = h('.table-container')
const hr = h('hr')()
const title = h('.title')
const input = h('.input-container')
const i18n = require('../i18n')

// translate names
each((tbl, tname) => each((field, fname) => {
  console.log([ 'table', tname, fname ].join('_').toUpperCase())
  const locale = i18n[[ 'table', tname, fname ].join('_').toUpperCase()]
  field.locale = locale || (field.ref
    ? i18n[`TABLE_${field.ref.replace('.', '_').toUpperCase()}`]
    : fname)
}, tbl), db)

const inputTypes = store((s, type) => {
  const simpleInput = h('input', { type })
  s[type] = data => simpleInput({ placeholder: data.exemple })
}, [ 'email', 'password', 'text', 'checkbox'])

inputTypes.selection = data => select(data.values.map(option))

const pouet = map.toArr((data, field) => {
  if (data.locked || data.auto) return

  let inp = inputTypes[data.type]
  
  if (!inp) {
    inp = inputTypes.text
    data.type && console.log(data)
  }

  console.log(data.locale)

  return input(label([
    data.locale,
    inp(data),
  ]))
})

module.exports = (name, state) => {
  const table = db[name]

  return container([
    title(name),
    hr,
    pouet(table),
  ])
}