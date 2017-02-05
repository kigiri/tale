const each = require('izi/collection/each')
const i18n = require('../i18n')
const state = require('../lib/state')

const db = {
  analysis: require('../db/analysis'),
  history: require('../db/history'),
  illustrations: require('../db/illustrations'),
  messages: require('../db/messages'),
  tags: require('../db/tags'),
  tales: require('../db/tales'),
  topics: require('../db/topics'),
  users: require('../db/users'),
}

// merge with locale
each((table, tname) =>
  each((field, fname) => {
    field.id = [ 'table', tname, fname ].join('_').toUpperCase()
    field.locale = i18n[field.id]
    field.obs = state.add(field.id, field.default)
  }, table),
  db)

// second pass to link refs
each((table, tname) =>
  each((field, fname) => field.locale || (field.locale = field.ref
      ? i18n[`TABLE_${field.ref.replace('.', '_').toUpperCase()}`]
      : i18n.apply(fname)),
    table),
  db)

module.exports = db