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
each((table, tname) => each((field, fname) => {
  field.id = [ 'table', tname, fname ].join('_').toUpperCase()
  field.exemple = i18n[`${field.id}_EXEMPLE`]
  field.locale = i18n[field.id]
  field.obs = state.add(field.id, field.default)
}, table), db)

// second pass to link refs
each((table, tname) =>
  each((field, fname) => {
    if (field.locale) return
    if (field.ref) {
      const refKey = `TABLE_${field.ref.replace('.', '_').toUpperCase()}`
      field.locale = i18n[refKey]
      field.exemple = i18n[`${refKey}_EXEMPLE`]
    } else {
      field.locale = i18n.apply(fname)
      // TODO : set a default exemple for each types
      //field.exemple = i18n[`${refKey}_EXEMPLE`]
    }
  }, table), db)

module.exports = db